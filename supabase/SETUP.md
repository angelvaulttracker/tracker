# Supabase Setup

1. Create a Supabase project.
2. In `Authentication -> Providers`, enable `Email`.
3. Turn on both:
   - `Magic Link`
   - `Email / Password`
4. In the SQL editor, run [`schema.sql`](/Users/isabelatellez/Documents/sonnies/supabase/schema.sql).
5. Copy [`app/supabase-config.example.js`](/Users/isabelatellez/Documents/sonnies/app/supabase-config.example.js) to [`app/supabase-config.js`](/Users/isabelatellez/Documents/sonnies/app/supabase-config.js) and fill in:
   - `url`
   - `anonKey`
6. In `Authentication -> URL Configuration`, add your local/dev and deployed redirect URLs.
7. For bug reports, set Edge Function secrets:
   - `RESEND_API_KEY`
   - `BUG_REPORT_TO_EMAIL`
   - `BUG_REPORT_FROM_EMAIL` (optional, defaults to Resend onboarding sender)
8. Deploy the Edge Function from [`supabase/functions/bug-report/index.ts`](/Users/isabelatellez/Documents/sonnies/supabase/functions/bug-report/index.ts).
9. Keep [`supabase/config.toml`](/Users/isabelatellez/Documents/sonnies/supabase/config.toml) committed so the `bug-report` function stays public (`verify_jwt = false`).

Notes:
- Tracker cloud sync is wired now.
- Stock, fund, shipments, and activity tables are ready in the schema, but their frontend sync layer still needs to be connected.
- The app can still work locally if Supabase is not configured yet.
- Bug report screenshots upload to the `bug-report-images` Storage bucket created by `schema.sql`.
- The bug report form now sends directly through the `bug-report` Edge Function instead of opening a local email draft.
