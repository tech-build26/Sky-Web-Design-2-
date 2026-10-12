-- AFTER verifying ownership and enrolling TOTP for both pre-provisioned accounts.
-- Public sign-up must be disabled in Supabase Auth. Run as database owner.
-- Membership is pinned to authenticated UUIDs, never assigned by a website form.
insert into recruitment_private.admins (user_id)
select u.id from auth.users u
where lower(u.email) in ('it@ropeaccess.co.za', 'beata@ropeaccess.co.za')
  and u.email_confirmed_at is not null
  and exists (select 1 from auth.mfa_factors f where f.user_id = u.id and f.factor_type = 'totp' and f.status = 'verified')
on conflict (user_id) do update set active = true;

select u.email, a.user_id, a.active from recruitment_private.admins a join auth.users u on u.id = a.user_id;
-- Expect exactly the two intended users. Revocation:
-- update recruitment_private.admins set active = false where user_id = '<verified UUID>';
