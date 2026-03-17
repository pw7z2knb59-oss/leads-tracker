"use client";

import { useState } from "react";
import Link from "next/link";
import { STATUS_OPTIONS, STATUS_LABELS } from "../../lib/constants";
import AddLeadForm from "./AddLeadForm";
import styles from "./leads.module.css";

interface FilterBarProps {
  /** Currently active filter value (status string, "overdue", or null for all) */
  current: string | null;
  /** Current text query from the URL search params */
  searchQuery: string;
}

/** Status filter pills + overdue pill + Add Lead toggle + inline form */
export default function FilterBar({ current, searchQuery }: FilterBarProps) {
  const [formOpen, setFormOpen] = useState(false);
  const clearHref = current ? `/leads?status=${current}` : "/leads";

  return (
    <>
      <div className={styles.filterBar}>
        {/* "All" pill */}
        <Link
          href="/leads"
          className={`${styles.filterPill} ${!current ? styles.filterActive : ""}`}
        >
          All
        </Link>

        {/* One pill per pipeline status */}
        {STATUS_OPTIONS.map((status) => (
          <Link
            key={status}
            href={`/leads?status=${status}`}
            className={`${styles.filterPill} ${current === status ? styles.filterActive : ""}`}
          >
            {STATUS_LABELS[status]}
          </Link>
        ))}

        {/* Overdue pill */}
        <Link
          href="/leads?status=overdue"
          className={`${styles.filterPill} ${current === "overdue" ? styles.filterActive : ""}`}
        >
          Overdue
        </Link>

        {/* Spacer pushes Add Lead to the right */}
        <div className={styles.filterSpacer} />

        {/* Search form uses GET so search state lives in the URL */}
        <form action="/leads" method="get" className={styles.searchForm}>
          {current ? <input type="hidden" name="status" value={current} /> : null}
          <input
            className={styles.searchInput}
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="Search leads…"
            aria-label="Search leads"
          />
          <button className={styles.searchButton} type="submit">
            Search
          </button>
          {searchQuery ? (
            <Link href={clearHref} className={styles.clearSearch}>
              Clear
            </Link>
          ) : null}
        </form>

        {/* Toggle add-lead form */}
        <button
          className="btn"
          type="button"
          onClick={() => setFormOpen((prev) => !prev)}
        >
          {formOpen ? "Cancel" : "+ Add Lead"}
        </button>
      </div>

      {/* Collapsible add-lead form */}
      <AddLeadForm open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}
