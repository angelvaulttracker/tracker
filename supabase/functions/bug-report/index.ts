import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const MAX_SCREENSHOTS = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const BUCKET_NAME = "bug-report-images";
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function cleanText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").slice(0, 120) || "image";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getRequestIp(request: Request) {
  const forwarded = request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "";
  return forwarded.split(",")[0]?.trim() || undefined;
}

async function validateTurnstile(token: string, secret: string, remoteIp?: string) {
  const formData = new FormData();
  formData.set("secret", secret);
  formData.set("response", token);
  if (remoteIp) {
    formData.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      return { success: false, "error-codes": ["verification-request-failed"] };
    }
    return await response.json();
  } catch (error) {
    console.error("Turnstile verification failed", error);
    return { success: false, "error-codes": ["verification-request-failed"] };
  }
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const bugReportToEmail = Deno.env.get("BUG_REPORT_TO_EMAIL");
    const turnstileSecretKey = Deno.env.get("TURNSTILE_SECRET_KEY");
    const bugReportFromEmail =
      Deno.env.get("BUG_REPORT_FROM_EMAIL") || "Sonny Tracker <onboarding@resend.dev>";

    if (!supabaseUrl || !serviceRoleKey) {
      return json({ error: "Supabase server secrets are missing." }, 500);
    }

    if (!resendApiKey || !bugReportToEmail) {
      return json({ error: "Bug reporting email secrets are missing." }, 500);
    }

    const formData = await request.formData();
    const reportType = cleanText(formData.get("report_type")) === "image_request"
      ? "image_request"
      : "bug_report";
    const reporterName = cleanText(formData.get("name"));
    const reporterContact = cleanText(formData.get("contact"));
    const reporterEmail = cleanText(formData.get("reporter_email"));
    const reporterUserId = cleanText(formData.get("reporter_user_id"));
    const description = cleanText(formData.get("description"));
    const requestedItemId = cleanText(formData.get("requested_item_id"));
    const requestedItemName = cleanText(formData.get("requested_item_name"));
    const requestedItemSeries = cleanText(formData.get("requested_item_series"));
    const captchaToken = cleanText(formData.get("captcha_token")) ||
      cleanText(formData.get("cf-turnstile-response"));
    const pageUrl = cleanText(formData.get("page_url"));
    const siteUrl = cleanText(formData.get("site_url"));
    const activeView = cleanText(formData.get("active_view"));
    const userAgent = cleanText(formData.get("user_agent"));
    const screenshots = formData
      .getAll("screenshots")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (turnstileSecretKey) {
      if (!captchaToken) {
        return json({ error: "Please finish the captcha first." }, 400);
      }
      const turnstileResult = await validateTurnstile(
        captchaToken,
        turnstileSecretKey,
        getRequestIp(request),
      );
      if (!turnstileResult.success) {
        console.error("Turnstile rejected submission", turnstileResult);
        return json({ error: "Captcha verification failed. Please try again." }, 400);
      }
    }

    if (reportType === "bug_report" && !description) {
      return json({ error: "Description is required." }, 400);
    }
    if (reportType === "image_request" && !requestedItemName) {
      return json({ error: "Choose a Sonny image to request first." }, 400);
    }

    if (screenshots.length > MAX_SCREENSHOTS) {
      return json({ error: `Please upload no more than ${MAX_SCREENSHOTS} screenshots.` }, 400);
    }

    for (const file of screenshots) {
      if (!file.type.startsWith("image/")) {
        return json({ error: "Screenshots must be image files." }, 400);
      }
      if (file.size > MAX_FILE_BYTES) {
        return json({ error: "Each screenshot must be 10 MB or smaller." }, 400);
      }
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const uploadedUrls: string[] = [];
    for (const file of screenshots) {
      const filename = sanitizeFilename(file.name);
      const objectPath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${filename}`;
      const uploadResult = await supabase.storage.from(BUCKET_NAME).upload(objectPath, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

      if (uploadResult.error) {
        return json({ error: "Could not upload one of the screenshots." }, 500);
      }

      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(objectPath);
      uploadedUrls.push(data.publicUrl);
    }

    const requestedItemLabel = requestedItemName
      ? `${requestedItemName}${requestedItemSeries ? ` (${requestedItemSeries})` : ""}`
      : "Not provided";
    const emailSubject = reportType === "image_request"
      ? `PNG request for ${requestedItemName || "Sonny"}${reporterName ? ` from ${reporterName}` : ""}`
      : `Bug report${reporterName ? ` from ${reporterName}` : ""}`;
    const details = [
      `Type: ${reportType === "image_request" ? "PNG image request" : "Bug report"}`,
      `Name: ${reporterName || "Not provided"}`,
      `Contact: ${reporterContact || "Not provided"}`,
      `Signed-in email: ${reporterEmail || "Not provided"}`,
      `User id: ${reporterUserId || "Not provided"}`,
      `Requested Sonny: ${requestedItemLabel}`,
      `Requested item id: ${requestedItemId || "Not provided"}`,
      `Page URL: ${pageUrl || "Not provided"}`,
      `Site URL: ${siteUrl || "Not provided"}`,
      `Active view: ${activeView || "Not provided"}`,
      `User agent: ${userAgent || "Not provided"}`,
    ];

    const textLines = reportType === "image_request"
      ? [
        "New Sonny PNG request",
        "",
        ...details,
        ...(description
          ? ["", "Note:", description]
          : []),
      ]
      : [
        "New bug report",
        "",
        ...details,
        "",
        "What happened:",
        description,
      ];

    if (uploadedUrls.length) {
      textLines.push("", "Screenshots:", ...uploadedUrls.map((url) => `- ${url}`));
    }

    const html = `
      <h2>${reportType === "image_request" ? "New Sonny PNG request" : "New bug report"}</h2>
      <p>${details.map((line) => escapeHtml(line)).join("<br />")}</p>
      ${
        description
          ? `<h3>${reportType === "image_request" ? "Note" : "What happened"}</h3>
      <p>${escapeHtml(description).replaceAll("\n", "<br />")}</p>`
          : ""
      }
      ${
        uploadedUrls.length
          ? `<h3>Screenshots</h3><ul>${uploadedUrls
              .map((url) => `<li><a href="${escapeHtml(url)}">${escapeHtml(url)}</a></li>`)
              .join("")}</ul>`
          : ""
      }
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: bugReportFromEmail,
        to: [bugReportToEmail],
        reply_to: reporterEmail || undefined,
        subject: emailSubject,
        text: textLines.join("\n"),
        html,
      }),
    });

    if (!emailResponse.ok) {
      const resendError = await emailResponse.text();
      console.error("Resend send failed", resendError);
      return json({ error: "Could not send the email." }, 502);
    }

    const logDescription = reportType === "image_request"
      ? `PNG request for ${requestedItemLabel}${description ? `\n\nNote:\n${description}` : ""}`
      : description;

    const insertResult = await supabase.from("bug_reports").insert({
      reporter_user_id: reporterUserId || null,
      reporter_email: reporterEmail,
      reporter_name: reporterName,
      reporter_contact: reporterContact,
      description: logDescription,
      page_url: pageUrl,
      site_url: siteUrl,
      active_view: activeView,
      user_agent: userAgent,
      screenshot_urls: uploadedUrls,
    });

    if (insertResult.error) {
      console.error("Could not log bug report", insertResult.error);
    }

    return json({ ok: true, attachments: uploadedUrls.length });
  } catch (error) {
    console.error("Unhandled bug report error", error);
    return json({ error: "Unexpected error while sending the bug report." }, 500);
  }
});
