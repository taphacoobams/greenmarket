/**
 * Compact page indices with ellipses for narrow viewports / many pages.
 */
export type PaginationSliceItem = number | "ellipsis";

export function getPaginationWindow(
  current: number,
  total: number,
  delta = 1,
): PaginationSliceItem[] {
  if (total < 1) return [];
  if (total <= 5 + delta * 2) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const raw: number[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      raw.push(i);
    }
  }
  const out: PaginationSliceItem[] = [];
  let prev: number | undefined;
  for (const i of raw) {
    if (prev !== undefined) {
      if (i - prev === 2) out.push(prev + 1);
      else if (i - prev > 1) out.push("ellipsis");
    }
    out.push(i);
    prev = i;
  }
  return out;
}
