create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  tracker_settings jsonb not null default '{}'::jsonb,
  stock_state jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles
  add column if not exists tracker_settings jsonb not null default '{}'::jsonb;

alter table public.profiles
  add column if not exists stock_state jsonb not null default '[]'::jsonb;

create table if not exists public.collection_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  sonny_id text not null,
  status text not null default 'missing' check (status in ('missing', 'have', 'iso', 'diso')),
  notes text not null default '',
  wishlist_rank integer,
  collected_at timestamptz,
  wishlist_added_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, sonny_id)
);

create index if not exists collection_progress_user_updated_idx
  on public.collection_progress (user_id, updated_at desc);

create table if not exists public.stock_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  sonny_id text not null default '',
  name text not null default '',
  series text not null default '',
  quantity integer not null default 1,
  status text not null default 'available' check (status in ('available', 'pending', 'sold', 'traded')),
  just_trading boolean not null default false,
  price numeric(10, 2) not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists stock_items_user_updated_idx
  on public.stock_items (user_id, updated_at desc);

create table if not exists public.fund_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null default '',
  amount numeric(10, 2) not null default 0,
  type text not null default 'out' check (type in ('in', 'out')),
  date date,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists fund_transactions_user_updated_idx
  on public.fund_transactions (user_id, updated_at desc);

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  preset_key text not null default '',
  name text not null default '',
  cost numeric(10, 2) not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists shipments_user_updated_idx
  on public.shipments (user_id, updated_at desc);

create table if not exists public.shipment_items (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid not null references public.shipments (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null default '',
  sell_price numeric(10, 2) not null default 0,
  keep_price numeric(10, 2) not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists shipment_items_user_updated_idx
  on public.shipment_items (user_id, updated_at desc);

create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null default 'system',
  title text not null default '',
  detail text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists activity_log_user_created_idx
  on public.activity_log (user_id, created_at desc);

create table if not exists public.bug_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid references auth.users (id) on delete set null,
  reporter_email text not null default '',
  reporter_name text not null default '',
  reporter_contact text not null default '',
  description text not null default '',
  page_url text not null default '',
  site_url text not null default '',
  active_view text not null default '',
  user_agent text not null default '',
  screenshot_urls jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists bug_reports_created_idx
  on public.bug_reports (created_at desc);

alter table public.profiles enable row level security;
alter table public.collection_progress enable row level security;
alter table public.stock_items enable row level security;
alter table public.fund_transactions enable row level security;
alter table public.shipments enable row level security;
alter table public.shipment_items enable row level security;
alter table public.activity_log enable row level security;
alter table public.bug_reports enable row level security;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'bug-report-images',
  'bug-report-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
  on public.profiles
  for select
  using (auth.uid() = id);

drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner"
  on public.profiles
  for insert
  with check (auth.uid() = id);

drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles are updatable by owner"
  on public.profiles
  for update
  using (auth.uid() = id);

drop policy if exists "Collection progress is readable by owner" on public.collection_progress;
create policy "Collection progress is readable by owner"
  on public.collection_progress
  for select
  using (auth.uid() = user_id);

drop policy if exists "Collection progress is insertable by owner" on public.collection_progress;
create policy "Collection progress is insertable by owner"
  on public.collection_progress
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Collection progress is updatable by owner" on public.collection_progress;
create policy "Collection progress is updatable by owner"
  on public.collection_progress
  for update
  using (auth.uid() = user_id);

drop policy if exists "Collection progress is deletable by owner" on public.collection_progress;
create policy "Collection progress is deletable by owner"
  on public.collection_progress
  for delete
  using (auth.uid() = user_id);

drop policy if exists "Stock items are readable by owner" on public.stock_items;
create policy "Stock items are readable by owner"
  on public.stock_items
  for select
  using (auth.uid() = user_id);

drop policy if exists "Stock items are insertable by owner" on public.stock_items;
create policy "Stock items are insertable by owner"
  on public.stock_items
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Stock items are updatable by owner" on public.stock_items;
create policy "Stock items are updatable by owner"
  on public.stock_items
  for update
  using (auth.uid() = user_id);

drop policy if exists "Stock items are deletable by owner" on public.stock_items;
create policy "Stock items are deletable by owner"
  on public.stock_items
  for delete
  using (auth.uid() = user_id);

drop policy if exists "Fund transactions are readable by owner" on public.fund_transactions;
create policy "Fund transactions are readable by owner"
  on public.fund_transactions
  for select
  using (auth.uid() = user_id);

drop policy if exists "Fund transactions are insertable by owner" on public.fund_transactions;
create policy "Fund transactions are insertable by owner"
  on public.fund_transactions
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Fund transactions are updatable by owner" on public.fund_transactions;
create policy "Fund transactions are updatable by owner"
  on public.fund_transactions
  for update
  using (auth.uid() = user_id);

drop policy if exists "Fund transactions are deletable by owner" on public.fund_transactions;
create policy "Fund transactions are deletable by owner"
  on public.fund_transactions
  for delete
  using (auth.uid() = user_id);

drop policy if exists "Shipments are readable by owner" on public.shipments;
create policy "Shipments are readable by owner"
  on public.shipments
  for select
  using (auth.uid() = user_id);

drop policy if exists "Shipments are insertable by owner" on public.shipments;
create policy "Shipments are insertable by owner"
  on public.shipments
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Shipments are updatable by owner" on public.shipments;
create policy "Shipments are updatable by owner"
  on public.shipments
  for update
  using (auth.uid() = user_id);

drop policy if exists "Shipments are deletable by owner" on public.shipments;
create policy "Shipments are deletable by owner"
  on public.shipments
  for delete
  using (auth.uid() = user_id);

drop policy if exists "Shipment items are readable by owner" on public.shipment_items;
create policy "Shipment items are readable by owner"
  on public.shipment_items
  for select
  using (auth.uid() = user_id);

drop policy if exists "Shipment items are insertable by owner" on public.shipment_items;
create policy "Shipment items are insertable by owner"
  on public.shipment_items
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Shipment items are updatable by owner" on public.shipment_items;
create policy "Shipment items are updatable by owner"
  on public.shipment_items
  for update
  using (auth.uid() = user_id);

drop policy if exists "Shipment items are deletable by owner" on public.shipment_items;
create policy "Shipment items are deletable by owner"
  on public.shipment_items
  for delete
  using (auth.uid() = user_id);

drop policy if exists "Activity log is readable by owner" on public.activity_log;
create policy "Activity log is readable by owner"
  on public.activity_log
  for select
  using (auth.uid() = user_id);

drop policy if exists "Activity log is insertable by owner" on public.activity_log;
create policy "Activity log is insertable by owner"
  on public.activity_log
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Activity log is updatable by owner" on public.activity_log;
create policy "Activity log is updatable by owner"
  on public.activity_log
  for update
  using (auth.uid() = user_id);

drop policy if exists "Activity log is deletable by owner" on public.activity_log;
create policy "Activity log is deletable by owner"
  on public.activity_log
  for delete
  using (auth.uid() = user_id);

create or replace function public.handle_profile_created()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update
    set email = excluded.email,
        updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_profile_created();
