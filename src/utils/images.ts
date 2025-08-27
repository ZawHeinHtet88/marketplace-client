export function getImageUrl({
  resource,
  fileName,
}: {
  resource: string;
  fileName: string | undefined | null;  
}) {
  if (!fileName) return "";
  return `${import.meta.env.import.meta.env.VITE_SOCKET_URL}/${resource}/${fileName}`;
}
