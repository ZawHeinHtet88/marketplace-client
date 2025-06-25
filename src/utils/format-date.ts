export function formatDate(date: string | Date): string {
  const dateOnly = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  // "Jun 26, 2023"
  return dateOnly;
}
