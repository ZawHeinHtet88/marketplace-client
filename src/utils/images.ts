export function getImageUrl({
  resource,
  fileName,
}: {
  resource: string;
  fileName: string | undefined | null;  
}) {
  if (!fileName) return "";
  return `${import.meta.env.VITE_IMAGE_URL}/${resource}/${fileName}`;
}
