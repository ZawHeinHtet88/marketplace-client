import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Merchant } from "../../types";
import { ShipIcon } from "lucide-react";
import { getImageUrl } from "@/utils/images";
function MerchantCard({ merchant }: { merchant: Merchant }) {
  return (
    <Link to={`/merchants/${merchant._id}`}>
      <Card className="border-primary shadopw p-0 pb-5 overflow-hidden">
        <img
          className="h-[200px] w-full object-cover rounded hover:scale-110 transition-all duration-100 ease-in-out"
          src={getImageUrl({ resource: "images", fileName: merchant.logo })}
          alt={merchant.businessName}
        />

        <CardContent>
          <CardTitle className="mb-2 font-semibold text-primary flex items-center gap-2">
            <ShipIcon /> {merchant.businessName}
          </CardTitle>
          <CardDescription>{merchant.address.full}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

export default MerchantCard;
