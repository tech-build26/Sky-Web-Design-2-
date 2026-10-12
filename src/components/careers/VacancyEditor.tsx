"use client";

import { useState, type FormEvent } from "react";
import { contractOptions, levelOptions, regionOptions, requirementGroups, roleOptions, rotationOptions, schemeOptions, sectorOptions, startOptions, validVacancy, vacancyStatuses, type Vacancy, type VacancyInput } from "@/lib/careers";
import { VacancyCard } from "./VacancyCard";
import styles from "./careers.module.css";
import admin from "./admin.module.css";

function SelectOther({ label, name, options, value = "" }: { label: string; name: string; options: readonly string[]; value?: string }) {
  const [selection, setSelection] = useState(value && !options.includes(value) ? "Other" : value);
  return <div className={styles.field}><label htmlFor={`edit-${name}`}>{label}</label><select id={`edit-${name}`} name={`${name}_select`} value={selection} onChange={event => setSelection(event.target.value)} required><option value="">Select an option</option>{options.map(v => <option key={v}>{v}</option>)}</select>{selection === "Other" && <><label htmlFor={`other-${name}`} className="sr-only">Specify {label.toLowerCase()}</label><input id={`other-${name}`} name={`${name}_other`} defaultValue={value === "Other" ? "" : value} required maxLength={160} placeholder={`Specify ${label.toLowerCase()}`} /></>}</div>;
}
export function VacancyEditor({ vacancy, onSave, busy, previewOnly = false }: { vacancy: Vacancy | null; onSave: (input: VacancyInput, existing: Vacancy | null) => Promise<boolean>; busy: boolean; previewOnly?: boolean }) {
  const [preview, setPreview] = useState<Vacancy | null>(null);
  const [error, setError] = useState("");
  function read(form: HTMLFormElement): VacancyInput {
    const data = new FormData(form);
    const text = (key: string) => String(data.get(key) ?? "").trim();
    const option = (key: string) => text(`${key}_select`) === "Other" ? text(`${key}_other`) : text(`${key}_select`);
    return { title: option("title"), level: option("level"), scheme: option("scheme"), region: option("region"), site: text("site"), sector: option("sector"), contract: option("contract"), start: option("start"), duration: text("duration"), rotation: option("rotation"), headcount: Number(text("headcount")), description: text("description"), requirements: data.getAll("requirements").map(String), additional_requirements: text("additional_requirements"), closing_at: text("closing_date") ? new Date(`${text("closing_date")}T23:59:59+02:00`).toISOString() : null, status: text("status") as VacancyInput["status"] };
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    const input = read(event.currentTarget);
    if (!validVacancy(input)) { setError("Complete the role details, add a description of at least 40 characters and choose at least one requirement or add a custom requirement."); return; }
    setError(""); await onSave(input, vacancy);
  }
  function makePreview(form: HTMLFormElement) {
    if (!form.reportValidity()) return;
    const input = read(form);
    if (!validVacancy(input)) { setError("Add a complete description and at least one selected or custom requirement before previewing."); return; }
    setError(""); setPreview({ ...input, id: vacancy?.id ?? "draft", reference: vacancy?.reference ?? "DRAFT PREVIEW", created_at: vacancy?.created_at ?? new Date().toISOString(), updated_at: vacancy?.updated_at ?? new Date().toISOString() });
  }
  return <section className={admin.editor} aria-labelledby="editor-heading"><h2 id="editor-heading">{vacancy ? "Edit vacancy" : "Create a vacancy"}</h2><p>{vacancy?.reference ?? "A reference is assigned when you save."} · All vacancy content is public when published. Keep confidential client and personal information out of adverts.</p>
    <form onSubmit={submit} aria-busy={busy}>
      <div className={styles.formGrid}>
        <SelectOther label="Position" name="title" options={roleOptions} value={vacancy?.title} /><SelectOther label="Rope-access level" name="level" options={levelOptions} value={vacancy?.level} />
        <SelectOther label="Certification scheme" name="scheme" options={schemeOptions} value={vacancy?.scheme} /><SelectOther label="Province / region" name="region" options={regionOptions} value={vacancy?.region} />
        <label className={styles.field}>Site / town / client area<input name="site" defaultValue={vacancy?.site} required maxLength={200} placeholder="e.g. eMalahleni industrial site" /><small>Use an area if the client or site name is confidential.</small></label><SelectOther label="Industry / site type" name="sector" options={sectorOptions} value={vacancy?.sector} />
        <SelectOther label="Contract type" name="contract" options={contractOptions} value={vacancy?.contract} /><label className={styles.field}>Personnel required<input name="headcount" type="number" min={1} max={500} defaultValue={vacancy?.headcount ?? 1} required /></label>
        <SelectOther label="Start window" name="start" options={startOptions} value={vacancy?.start} /><label className={styles.field}>Expected duration<input name="duration" defaultValue={vacancy?.duration} required maxLength={120} placeholder="e.g. 6-week shutdown / ongoing" /></label>
        <SelectOther label="Travel / working pattern" name="rotation" options={rotationOptions} value={vacancy?.rotation} /><label className={styles.field}>Closing date (optional)<input name="closing_date" type="date" defaultValue={vacancy?.closing_at ? new Date(vacancy.closing_at).toLocaleDateString("en-CA", { timeZone: "Africa/Johannesburg" }) : ""} /><small>Closes at 23:59 South African time. Leave blank to close manually when filled.</small></label>
        <label className={`${styles.field} ${styles.full}`}>Job description<textarea name="description" rows={7} defaultValue={vacancy?.description} required minLength={40} maxLength={8000} placeholder="Describe the actual task, work environment, responsibilities, deployment and what a successful assignment involves." /></label>
      </div>
      {Object.entries(requirementGroups).map(([group, options]) => <fieldset key={group} className={admin.requirements}><legend>{group}</legend><div className={admin.checks}>{options.map(value => <label key={value} className={styles.checkbox}><input type="checkbox" name="requirements" value={value} defaultChecked={vacancy?.requirements.includes(value)} /><span>{value}</span></label>)}</div></fieldset>)}
      <div className={styles.formGrid}><label className={`${styles.field} ${styles.full}`}>Other / additional requirements<textarea name="additional_requirements" rows={4} defaultValue={vacancy?.additional_requirements} maxLength={3000} placeholder="Add role-specific skills, years of experience, required qualification scope or client conditions not listed above." /><small>A fitness certificate can be a requirement. Do not request diagnoses, medical reports or ID copies in the application.</small></label><label className={styles.field}>Publication status<select name="status" defaultValue={vacancy?.status ?? "draft"}>{vacancyStatuses.map(value => <option key={value} value={value}>{value[0].toUpperCase() + value.slice(1)}</option>)}</select><small>Only Published roles appear on Careers. Closed and Archived roles accept no new applications.</small></label></div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={admin.toolbar}><button className={styles.primary} type="submit" disabled={busy || previewOnly}>{previewOnly ? "Saving disabled in design preview" : busy ? "Saving…" : "Save vacancy"}</button><button className={styles.secondary} type="button" onClick={event => { if (event.currentTarget.form) makePreview(event.currentTarget.form); }}>Preview advert</button></div>
    </form>
    {preview && <div className={admin.preview}><p className={styles.eyebrow}>Public advert preview / not saved by previewing</p><VacancyCard vacancy={preview} preview /></div>}
  </section>;
}
