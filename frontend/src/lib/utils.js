/**
 * Simple class-name merger. Joins truthy strings and deduplicates nothing —
 * good enough without clsx/tailwind-merge as a dependency.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
