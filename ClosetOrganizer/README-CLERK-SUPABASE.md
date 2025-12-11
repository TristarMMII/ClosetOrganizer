### Migration: backfill `clerk_user_id` from `user_id`

If you previously stored Clerk IDs in `user_id` (e.g. if you already used Clerk before), you can copy the values into `clerk_user_id`:

```sql
alter table public.closet_items add column clerk_user_id text;
update public.closet_items set clerk_user_id = user_id::text;
create index on public.closet_items (clerk_user_id);
```

If your `user_id` column currently contains Supabase Auth UUIDs, do not backfill — instead keep both columns and decide how you want to migrate (for example, map Clerk IDs to Supabase users server-side).

# Clerk + Supabase Integration Notes

This app now uses Clerk for authentication and stores Clerk IDs on `closet_items` to associate items with users. The recommended column name is `clerk_user_id` (text). Below are steps and recommendations to make this secure and functional.

## Client-side (already implemented)

- Clerk provider is configured in `app/_layout.tsx` and the app uses `useUser` and `useAuth` hooks.
- `app/sign-in.tsx` and `app/sign-up.tsx` provide the basic sign-in / sign-up screens.
- `components/sidebar.tsx` shows user details, and conditionally shows Add Item and Sign In / Sign Out actions.
- `app/add-item.tsx` now sets `clerk_user_id: user.id` when inserting a new `closet_items` row.
- `app/closet.tsx` fetches closet items filtered by `.eq('clerk_user_id', user.id)` (with a fallback to `user_id`).

## Server-side / Database

The DB table `closet_items` requires a `user_id` or `clerk_user_id` column to be set by the client.

If you already use Supabase Auth and the `user_id` column is typed as a UUID, you have two approaches:

1. Easiest, **non-breaking** approach: add a new column to store Clerk IDs as text. This avoids converting existing UUID columns and keeps Supabase Auth intact.

```sql
alter table public.closet_items add column clerk_user_id text;
create index on public.closet_items (clerk_user_id);
```

Update your client to use `clerk_user_id` when inserting/filtering by Clerk users (the provided code now uses `clerk_user_id`).

2. If you prefer to reuse `user_id` and you're not using Supabase Auth for authentication, convert the column type to `text`:

```sql
-- If your user_id is currently a UUID type and doesn't contain Clerk IDs, you can alter the type:
alter table public.closet_items alter column user_id type text using user_id::text;
create index on public.closet_items (user_id);
```

If `user_id` already contains Clerk IDs (like `user_xxx` strings), you will need to add a new column, populate it, then drop/rename old column instead of altering UUID to avoid casting errors.

### Row-Level Security (Optional but recommended)

Supabase RLS is normally used with Supabase Auth. If you want to make server-side policies that users can only access their own rows, you must either:

1. Use Supabase Auth for authentication instead of Clerk (Supabase manages `auth.uid()`), or
2. Create a mapping between Clerk's JWT and Supabase JWT (advanced). See Clerk docs for "Custom JWT" or Supabase docs for "External JWT"

If you want to protect data using Supabase RLS while keeping Clerk, you can create a short server API that verifies the Clerk session and makes Supabase calls with a Service Role key (not recommended for client use). Or configure Supabase to accept Clerk's JWT as a trusted issuer.

### Minimal RLS (if using Supabase Auth):

```sql
-- enable RLS if not already enabled
alter table public.closet_items enable row level security;

create policy "Users can select their rows" on public.closet_items
for select using (user_id = auth.uid());

create policy "Users can insert their rows" on public.closet_items
for insert with check (user_id = auth.uid());
```

## Environment Variables

Add the following environment variables in your Expo environment (e.g. in `app.json`, `.env`, or via your hosting provider):

- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` — your Clerk frontend publishable key
- `EXPO_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon key (for dev only)

Note: If you previously used `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (a Next.js style naming), the app now supports that name as a fallback during development. However for Expo and the web the `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` is the recommended env var to use.

Also, do not put your `CLERK_SECRET_KEY` in a client-side `.env` — secret keys should remain server-only.

## Next Steps (Suggestions)

- If you plan to keep Clerk and Supabase, consider wiring Clerk -> Supabase JWT mapping to make server-side RLS work.
- Add error handling and messages for the user when actions require sign-in.
- Add tests / logging for event flows.
