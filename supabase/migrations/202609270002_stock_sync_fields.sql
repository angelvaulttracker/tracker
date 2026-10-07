alter table public.stock_items
  add column if not exists sold_history jsonb not null default '[]'::jsonb;

alter table public.fund_transactions
  add column if not exists amount_mode text not null default 'total',
  add column if not exists sonny_ids jsonb not null default '[]'::jsonb,
  add column if not exists figure_price numeric(10, 2) not null default 0,
  add column if not exists figure_prices_by_id jsonb not null default '{}'::jsonb,
  add column if not exists shipping numeric(10, 2) not null default 0,
  add column if not exists person_name text not null default '',
  add column if not exists paid_via text,
  add column if not exists sent_to_real_fund boolean not null default false;

create table if not exists public.stock_price_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  stock_item_id uuid,
  figure_key text not null default '',
  sonny_id text not null default '',
  name text not null default '',
  series text not null default '',
  price numeric(10, 2) not null default 0,
  source text not null default 'stocked',
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists stock_price_history_user_created_idx
  on public.stock_price_history (user_id, created_at desc);

alter table public.stock_price_history enable row level security;

drop policy if exists "Stock price history is readable by owner" on public.stock_price_history;
create policy "Stock price history is readable by owner"
  on public.stock_price_history for select
  using (auth.uid() = user_id);

drop policy if exists "Stock price history is insertable by owner" on public.stock_price_history;
create policy "Stock price history is insertable by owner"
  on public.stock_price_history for insert
  with check (auth.uid() = user_id);

drop policy if exists "Stock price history is updatable by owner" on public.stock_price_history;
create policy "Stock price history is updatable by owner"
  on public.stock_price_history for update
  using (auth.uid() = user_id);

drop policy if exists "Stock price history is deletable by owner" on public.stock_price_history;
create policy "Stock price history is deletable by owner"
  on public.stock_price_history for delete
  using (auth.uid() = user_id);
