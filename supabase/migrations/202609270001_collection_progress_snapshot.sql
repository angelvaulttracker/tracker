alter table public.collection_progress
  add column if not exists progress_data jsonb not null default '{}'::jsonb;

comment on column public.collection_progress.progress_data is
  'Complete client-side collection entry, including owned quantity and per-copy details. Scalar columns remain canonical for filtering and backward compatibility.';
