import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProductSkeletonCard() {
  return (
    <Card className="p-5 border-card">
      <Skeleton className="h-[300px]"/>
    </Card>
  );
}

export default ProductSkeletonCard;
