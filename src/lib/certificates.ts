import registry from '../data/certificates.json';

export interface CourseInfo {
  titleRu: string;
  titleEn: string;
  titleUz: string;
  subtitleRu: string;
  subtitleEn: string;
  organizer: string;
  format: string;
  hours: number;
  trainers: string[];
  director: string;
}

export interface Certificate {
  /** Human-readable registry number, e.g. "2026-001". */
  number: string;
  /** Secret verification code printed on the cert + encoded in the QR. */
  code: string;
  /** Full name of the holder (as printed). */
  name: string;
  nameEn?: string;
  /** ISO date the course was held. */
  courseDate: string;
  /** ISO date the certificate was issued. */
  issueDate: string;
  /** Marks the public demo entry. */
  demo?: boolean;
  /** Optional per-certificate course override. */
  course?: Partial<CourseInfo>;
}

export const course: CourseInfo = registry.course as CourseInfo;

export const certificates: Certificate[] = registry.certificates as Certificate[];

/** Course info for a certificate, merging any per-cert override. */
export function courseFor(cert: Certificate): CourseInfo {
  return { ...course, ...(cert.course ?? {}) };
}

/** Find a certificate by its verification code (case-insensitive). */
export function findByCode(code: string): Certificate | undefined {
  const norm = code.trim().toUpperCase();
  return certificates.find((c) => c.code.toUpperCase() === norm);
}

/** Format an ISO date (YYYY-MM-DD) as DD.MM.YYYY. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d}.${m}.${y}`;
}
