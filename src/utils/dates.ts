// Pure date helpers for 'YYYY-MM' strings. Months are counted as integers
// (year * 12 + month index) so the math stays simple and timezone-free.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function toMonthIndex(ym: string): number {
  const [year, month] = ym.split('-').map(Number);
  return year * 12 + (month - 1);
}

export function currentMonthIndex(now: Date = new Date()): number {
  return now.getFullYear() * 12 + now.getMonth();
}

export function formatYearMonth(ym: string): string {
  const [year, month] = ym.split('-').map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatRange(start: string, end: string | null): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : 'now'}`;
}

/** Length of a job in months, counting the start month. */
export function durationInMonths(start: string, end: string | null, now?: Date): number {
  const endIndex = end ? toMonthIndex(end) : currentMonthIndex(now);
  return Math.max(1, endIndex - toMonthIndex(start) + 1);
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ') || '1 mo';
}

/** Whole years since a 'YYYY-MM' month, for "8+ years" style labels. */
export function yearsSince(start: string, now?: Date): number {
  return Math.floor((currentMonthIndex(now) - toMonthIndex(start)) / 12);
}
