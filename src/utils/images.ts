export function getImageUrl({
  resource,
  fileName,
}: {
  resource: string;
  fileName: string | undefined | null;
}) {
  if (!fileName) return "";
  return `http://localhost:3000/${resource}/${fileName}`;
}
