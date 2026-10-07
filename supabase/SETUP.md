# Supabase Setup

1. Create a Supabase project.
2. In `Authentication -> Providers`, enable `Email`.
3. Turn on both:
   - `Magic Link`
   - `Email / Password`
4. In the SQL editor, run [`schema.sql`](/Users/isabelatellez/Documents/sonnies/supabase/schema.sql) for a new project. For an existing project, also apply new files in [`migrations`](/Users/isabelatellez/Documents/sonnies/supabase/migrations) in filename order.
5. Copy [`app/supabase-config.example.js`](/Users/isabelatellez/Documents/sonnies/app/supabase-config.example.js) to [`app/supabase-config.js`](/Users/isabelatellez/Documents/sonnies/app/supabase-config.js) and fill in:
   - `url`
   - `anonKey`
   - `siteUrl`
   - `turnstileSiteKey` (optional, for captcha)
6. In `Authentication -> URL Configuration`, add your local/dev and deployed redirect URLs.
7. For bug reports, set Edge Function secrets:
   - `RESEND_API_KEY`
   - `BUG_REPORT_TO_EMAIL`
   - `BUG_REPORT_FROM_EMAIL` (optional, defaults to Resend onboarding sender)
   - `TURNSTILE_SECRET_KEY` (optional, only if you enable captcha)
8. Deploy the Edge Function from [`supabase/functions/bug-report/index.ts`](/Users/isabelatellez/Documents/sonnies/supabase/functions/bug-report/index.ts).
9. Keep [`supabase/config.toml`](/Users/isabelatellez/Documents/sonnies/supabase/config.toml) committed so the `bug-report` function stays public (`verify_jwt = false`).

Notes:
- Tracker cloud sync includes status, counts, per-copy names, acquisition details, condition, value estimates, notes, dates, and uploaded collection photos. Existing projects need `202609270001_collection_progress_snapshot.sql` for this full snapshot sync.
- Tracker settings and native `UFS / UFT` stock state are now also saved into `profiles.tracker_settings` and `profiles.stock_state`, so re-run `schema.sql` after pulling schema updates.
- Lightweight product analytics now log into `site_events`, so re-run `schema.sql` after pulling this change if you want usage events to save.
- The standalone stock shelf syncs stock, price history, fund transactions, shipments, shipment items, and activity after `202609270002_stock_sync_fields.sql` is applied.
- The app can still work locally if Supabase is not configured yet.
- Bug report screenshots upload to the private `bug-report-images` Storage bucket created by `schema.sql`. Email links are signed and expire after seven days; existing projects should apply `20260927000000_make_bug_report_images_private.sql`.
- The bug report form now sends directly through the `bug-report` Edge Function instead of opening a local email draft.
- PNG image requests use the same Edge Function and arrive by email too.
- If Turnstile is configured, both forms require captcha before sending.
