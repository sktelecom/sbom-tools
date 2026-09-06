// Copyright 2026 SK Telecom Co., Ltd.
// SPDX-License-Identifier: Apache-2.0

/**
 * Severity → badge-tone mapping, shared by every screen that shows a CVSS
 * severity grade (the Vulnerabilities table, the External lookup screen).
 * Pulled out of VulnerabilitiesTable so the two can't drift into painting the
 * same grade two different colors: a screen showing a CVE two different
 * severity colors depending on where it was opened from would be worse than
 * either being wrong alone.
 */

export type SeverityTone = "critical" | "high" | "medium" | "low" | "info";

/** CRITICAL/HIGH/MEDIUM/LOW map to their own tone. UNKNOWN and NONE (a CVSS
 *  0.0 base score, only seen from the external-lookup OSV contract) both fall
 *  back to the neutral "info" tone via `severityTone`'s default. */
export const SEVERITY_TONE: Record<string, SeverityTone> = {
  CRITICAL: "critical",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
  UNKNOWN: "info",
  NONE: "info",
};

/** Tone for a severity string, falling back to "info" for anything unmapped
 *  (an unrecognized or absent grade should read as neutral, not alarming). */
export function severityTone(severity: string | null | undefined): SeverityTone {
  return SEVERITY_TONE[severity ?? ""] ?? "info";
}
