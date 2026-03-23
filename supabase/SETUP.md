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

Notes:
- Tracker cloud sync is wired now.
- Stock, fund, shipments, and activity tables are ready in the schema, but their frontend sync layer still needs to be connected.
- The app can still work locally if Supabase is not configured yet.
