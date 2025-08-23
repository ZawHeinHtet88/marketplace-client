import { Card, CardContent } from "./card";

export default function SkeletonCards({
  count = 6,
}: {
  count?: number;
  
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
}

const SkeletonCard = () => (
  <Card className="animate-pulse">
    <CardContent className="flex flex-col gap-3 p-4">
      <div className="bg-gray-200 rounded-lg h-40 w-full" />
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </CardContent>
  </Card>
);
