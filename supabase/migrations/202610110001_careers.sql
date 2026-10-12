-- Run in a NEW staging Supabase project first. No CV/application storage is created.
begin;
create schema if not exists recruitment_private;
revoke all on schema recruitment_private from public, anon, authenticated;

create table recruitment_private.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  active boolean not null default true
);
create table recruitment_private.audit (
  id bigint generated always as identity primary key,
  actor uuid, vacancy_id uuid not null, action text not null,
  status text not null, at timestamptz not null default now()
);
create table recruitment_private.rate_limits (
  key text primary key check (key ~ '^[a-f0-9]{64}$'),
  attempts integer not null, expires_at timestamptz not null
);
revoke all on all tables in schema recruitment_private from public, anon, authenticated;
alter table recruitment_private.admins enable row level security;
alter table recruitment_private.audit enable row level security;
alter table recruitment_private.rate_limits enable row level security;

create function public.is_recruitment_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((auth.jwt()->>'aal') = 'aal2', false)
    and exists (select 1 from auth.sessions s where s.id = (auth.jwt()->>'session_id')::uuid and s.user_id = auth.uid())
    and exists (
      select 1 from recruitment_private.admins a join auth.users u on u.id = a.user_id
      where a.user_id = auth.uid() and a.active and u.email_confirmed_at is not null
        and lower(u.email) in ('it@ropeaccess.co.za', 'beata@ropeaccess.co.za')
        and (u.banned_until is null or u.banned_until < now())
    )
    and exists (select 1 from auth.mfa_factors f where f.user_id = auth.uid() and f.factor_type = 'totp' and f.status = 'verified')
    and exists (
      select 1 from jsonb_array_elements(coalesce(auth.jwt()->'amr', '[]'::jsonb)) m
      where m->>'method' = 'totp' and (m->>'timestamp')::bigint > extract(epoch from now() - interval '8 hours')
    );
$$;
revoke all on function public.is_recruitment_admin() from public, anon;
grant execute on function public.is_recruitment_admin() to authenticated;

create sequence recruitment_private.vacancy_reference;
create table public.vacancies (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default ('SKY-V' || lpad(nextval('recruitment_private.vacancy_reference')::text, 5, '0')),
  title text not null check (char_length(title) between 1 and 160),
  level text not null check (char_length(level) between 1 and 160),
  scheme text not null check (char_length(scheme) between 1 and 160),
  region text not null check (char_length(region) between 1 and 160),
  site text not null check (char_length(site) between 1 and 200),
  sector text not null check (char_length(sector) between 1 and 160),
  contract text not null check (char_length(contract) between 1 and 160),
  start text not null check (char_length(start) between 1 and 160),
  duration text not null check (char_length(duration) between 1 and 120),
  rotation text not null check (char_length(rotation) between 1 and 160),
  headcount integer not null check (headcount between 1 and 500),
  description text not null check (char_length(description) between 40 and 8000),
  requirements text[] not null default '{}' check (cardinality(requirements) <= 60),
  additional_requirements text not null default '' check (char_length(additional_requirements) <= 3000),
  status text not null default 'draft' check (status in ('draft', 'published', 'closed', 'archived')),
  closing_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (cardinality(requirements) > 0 or char_length(additional_requirements) >= 10)
);
alter table public.vacancies enable row level security;
revoke all on public.vacancies from public, anon, authenticated;
grant select on public.vacancies to anon, authenticated;
grant insert (title, level, scheme, region, site, sector, contract, start, duration, rotation, headcount, description, requirements, additional_requirements, status, closing_at) on public.vacancies to authenticated;
grant update (title, level, scheme, region, site, sector, contract, start, duration, rotation, headcount, description, requirements, additional_requirements, status, closing_at) on public.vacancies to authenticated;
grant all on public.vacancies to service_role;
-- Defaults call a sequence in a deliberately inaccessible schema through the trigger below.
alter table public.vacancies alter column reference drop default;
create function recruitment_private.set_vacancy_fields() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if TG_OP = 'INSERT' then
    new.reference := 'SKY-V' || lpad(nextval('recruitment_private.vacancy_reference')::text, 5, '0');
    new.created_at := clock_timestamp();
  end if;
  if new.status = 'published' and new.closing_at is not null and new.closing_at <= now() then
    raise exception 'Published vacancies require a future closing date';
  end if;
  new.updated_at := clock_timestamp();
  return new;
end;
$$;
create trigger vacancy_fields before insert or update on public.vacancies for each row execute function recruitment_private.set_vacancy_fields();
create function recruitment_private.audit_vacancy() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into recruitment_private.audit(actor, vacancy_id, action, status) values (auth.uid(), new.id, TG_OP, new.status);
  return new;
end;
$$;
create trigger vacancy_audit after insert or update on public.vacancies for each row execute function recruitment_private.audit_vacancy();
create policy public_open_roles on public.vacancies for select to anon, authenticated using (status = 'published' and (closing_at is null or closing_at > now()));
create policy admin_read on public.vacancies for select to authenticated using ((select public.is_recruitment_admin()));
create policy admin_insert on public.vacancies for insert to authenticated with check ((select public.is_recruitment_admin()));
create policy admin_update on public.vacancies for update to authenticated using ((select public.is_recruitment_admin())) with check ((select public.is_recruitment_admin()));
create index vacancies_open on public.vacancies(status, closing_at);

-- Shared, atomic one-hour limiter. HMAC digests only; no raw IPs/emails/applications.
create function public.consume_careers_rate(p_key text, p_limit integer) returns boolean
language plpgsql security definer set search_path = '' as $$
declare used integer;
begin
  if p_key !~ '^[a-f0-9]{64}$' or p_limit < 1 or p_limit > 50 then raise exception 'Invalid rate key'; end if;
  delete from recruitment_private.rate_limits where expires_at < now();
  insert into recruitment_private.rate_limits(key, attempts, expires_at) values (p_key, 1, now() + interval '1 hour')
  on conflict (key) do update set attempts = recruitment_private.rate_limits.attempts + 1
  returning attempts into used;
  return used <= p_limit;
end;
$$;
revoke all on function public.consume_careers_rate(text, integer) from public, anon, authenticated;
grant execute on function public.consume_careers_rate(text, integer) to service_role;
revoke all on all functions in schema recruitment_private from public, anon, authenticated;
commit;
