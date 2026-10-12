"use client";

import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { ADMIN_EMAILS, type Vacancy, type VacancyInput } from "@/lib/careers";
import { VacancyEditor } from "./VacancyEditor";
import styles from "./careers.module.css";
import admin from "./admin.module.css";

export function CareersAdmin({ url, publicKey, showEditorPreview = false }: { url: string; publicKey: string; showEditorPreview?: boolean }) {
  const db = useMemo(() => url && publicKey ? createClient(url, publicKey, { auth: { storage: typeof window !== "undefined" ? window.sessionStorage : undefined, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } }) : null, [url, publicKey]);
  const [stage, setStage] = useState<"login" | "mfa" | "manager">("login");
  const [factor, setFactor] = useState("");
  const [qr, setQr] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [selected, setSelected] = useState<Vacancy | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const mfaInput = useRef<HTMLInputElement>(null);
  async function request(method = "GET", input?: unknown, pageNumber = 0) {
    if (!db) throw new Error("Recruitment administration is not configured.");
    const { data, error } = await db.auth.getSession();
    if (error || !data.session) throw new Error("Your session has ended. Sign in again.");
    const response = await fetch(`/api/careers/admin${method === "GET" ? `?page=${pageNumber}` : ""}`, { method, headers: { Authorization: `Bearer ${data.session.access_token}`, "Content-Type": "application/json" }, ...(input ? { body: JSON.stringify(input) } : {}), cache: "no-store" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "The request could not be completed.");
    return result;
  }
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!db || busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email")).trim().toLowerCase();
    setError(""); setMessage(""); setBusy(true);
    try {
      if (!ADMIN_EMAILS.some(allowed => email === allowed)) throw new Error("Use your authorised Skyriders recruitment account.");
      await db.auth.signOut({ scope: "local" });
      const { error } = await db.auth.signInWithPassword({ email, password: String(data.get("password")) });
      if (error) throw new Error("Sign-in was unsuccessful. Check your details or contact your account administrator.");
      form.reset();
      const { data: factors, error: factorError } = await db.auth.mfa.listFactors();
      if (factorError) throw new Error("Authenticator settings could not be loaded.");
      const verified = factors.totp.find(f => f.status === "verified");
      setQr(""); setSecret("");
      if (verified) setFactor(verified.id);
      else {
        for (const pending of factors.all.filter(f => f.factor_type === "totp" && f.status !== "verified")) await db.auth.mfa.unenroll({ factorId: pending.id });
        const { data: enrollment, error: enrollmentError } = await db.auth.mfa.enroll({ factorType: "totp", friendlyName: "Skyriders recruitment", issuer: "Skyriders" });
        if (enrollmentError || !enrollment) throw new Error("Authenticator setup could not be started. Contact your account administrator.");
        setFactor(enrollment.id); setQr(enrollment.totp.qr_code); setSecret(enrollment.totp.secret);
      }
      setStage("mfa"); setTimeout(() => mfaInput.current?.focus(), 0);
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Unable to sign in."); }
    finally { setBusy(false); }
  }
  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!db || busy) return;
    const code = String(new FormData(event.currentTarget).get("code")).trim();
    setBusy(true); setError("");
    try {
      const { error } = await db.auth.mfa.challengeAndVerify({ factorId: factor, code });
      if (error) throw new Error("That code could not be verified. Use the current six-digit code from your Authenticator app.");
      setQr(""); setSecret("");
      const result = await request();
      setVacancies(result.vacancies); setPage(0); setHasMore(result.hasMore); setStage("manager");
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Unable to verify your code."); }
    finally { setBusy(false); }
  }
  async function logout() {
    await db?.auth.signOut({ scope: "local" }); setStage("login"); setVacancies([]); setSelected(null); setQr(""); setSecret(""); setError(""); setMessage("");
  }
  async function reload() {
    if (busy) return;
    setBusy(true); setError("");
    try { const result = await request(); setVacancies(result.vacancies); setPage(0); setHasMore(result.hasMore); setSelected(null); setEditorKey(k => k + 1); setMessage("Vacancies reloaded."); }
    catch (failure) { setError(failure instanceof Error ? failure.message : "Unable to reload."); }
    finally { setBusy(false); }
  }
  async function save(input: VacancyInput, existing: Vacancy | null) {
    if (busy) return false;
    setBusy(true); setError(""); setMessage("");
    try {
      const { vacancy } = await request(existing ? "PATCH" : "POST", { ...input, ...(existing ? { id: existing.id, updated_at: existing.updated_at } : {}) });
      setVacancies(current => [vacancy, ...current.filter(v => v.id !== vacancy.id)]); setSelected(vacancy); setEditorKey(k => k + 1);
      setMessage(`${vacancy.reference} saved as ${vacancy.status}. ${vacancy.status === "published" ? "The advert is now visible on Careers." : "The advert is hidden from the public board."}`); return true;
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Unable to save."); return false; }
    finally { setBusy(false); }
  }
  async function loadMore() {
    if (busy) return;
    setBusy(true); setError("");
    try {
      const result = await request("GET", undefined, page + 1);
      setVacancies(current => [...current, ...result.vacancies.filter((v: Vacancy) => !current.some(row => row.id === v.id))]);
      setPage(page + 1); setHasMore(result.hasMore);
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Unable to load more vacancies."); }
    finally { setBusy(false); }
  }
  return <div className={admin.shell}><div className={admin.top}><div><small>Skyriders / Recruitment</small><h1>Build the next site team.</h1><p>Manage project vacancies. Applications and CVs go directly to reception@ropeaccess.co.za.</p></div><div><a href="/careers" target="_blank" rel="noopener noreferrer">View Careers ↗<span className="sr-only"> (opens in a new tab)</span></a>{stage !== "login" && <div className={admin.toolbar}><button type="button" className={styles.secondary} onClick={logout}>Sign out</button></div>}</div></div>
    {error && <p className={styles.error} role="alert">{error}</p>}{message && <p className={styles.success} role="status">{message}</p>}
    {!db ? <><section className={admin.login}><h2>Administration is not connected yet.</h2><p>This local preview has no recruitment credentials configured. The production setup must be completed before administrators can sign in or publish vacancies.</p><a className={styles.secondary} href="/careers">Back to Careers</a></section>{showEditorPreview && <><p className={styles.advice}>Local design preview: explore the form and preview an advert. Saving and publication are disabled. This preview is absent in production.</p><VacancyEditor vacancy={null} onSave={async () => false} busy={false} previewOnly /></>}</>
      : stage === "login" ? <section className={admin.login}><h2>Recruitment sign-in</h2><p>Authorised administrators only. Your password and an Authenticator code are required.</p><form onSubmit={login}><label className={styles.field}>Work email<input name="email" type="email" required autoComplete="username" maxLength={254} /></label><label className={styles.field}>Password<input name="password" type="password" required autoComplete="current-password" maxLength={256} /></label><button className={styles.primary} disabled={busy} type="submit">{busy ? "Signing in…" : "Continue to Authenticator"}</button></form><p>Account recovery is handled by your authorised account administrator after identity verification.</p></section>
      : stage === "mfa" ? <section className={admin.login}><h2>{qr ? "Set up your Authenticator" : "Verify your sign-in"}</h2>{qr ? <><p>Scan this code with your Authenticator app, then enter its current six-digit code. Keep the setup key private. Initial access also requires the account administrator to grant your recruitment membership.</p><Image src={qr} width={220} height={220} alt="Authenticator setup QR code" unoptimized /><p>Manual setup key</p><code>{secret}</code></> : <p>Enter the current six-digit code from your Authenticator app.</p>}<form onSubmit={verify}><label className={styles.field}>Authenticator code<input ref={mfaInput} name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" minLength={6} maxLength={6} required /></label><button className={styles.primary} disabled={busy} type="submit">{busy ? "Verifying…" : "Verify & open vacancies"}</button></form></section>
      : <div className={admin.layout}><aside className={admin.sidebar}><div className={admin.toolbar}><button type="button" className={styles.primary} disabled={busy} onClick={() => { setSelected(null); setEditorKey(k => k + 1); setMessage(""); }}>New vacancy +</button><button type="button" className={styles.secondary} disabled={busy} onClick={reload}>Reload</button></div><p>{vacancies.length} loaded vacancies · most recent first</p>{vacancies.map(v => <button key={v.id} type="button" disabled={busy} aria-pressed={v.id === selected?.id} onClick={() => { setSelected(v); setEditorKey(k => k + 1); setError(""); setMessage(""); }}><small>{v.reference}</small><strong>{v.title}</strong><small>{v.site} · {v.region}</small><span className={admin.state}>{v.status}</span></button>)}{hasMore && <button type="button" className={styles.secondary} disabled={busy} onClick={loadMore}>Load older vacancies</button>}</aside><VacancyEditor key={editorKey} vacancy={selected} onSave={save} busy={busy} /></div>}
  </div>;
}
