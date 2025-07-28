import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Merchant } from "@/modules/products/type";
import { getImageUrl } from "@/utils/images";
import { useNavigate } from "react-router-dom";

function SellerCard({merchant}:{merchant:Merchant}) {
  const navigate = useNavigate()
  return (
    <Card
      onClick={() => navigate(`/merchants/${merchant.id}`)}
      className="border-card cursor-pointer"
    >
      <CardContent className="mx-auto p-1  overflow-hidden w-[150px] h-[150px] rounded-full border-4 transition-all duration-200 border-primary">
        <img
          className="rounded-full w-full h-full"
          src={getImageUrl({ resource: "images", fileName: merchant.logo })}
          alt="card"
        />
      </CardContent>
      <CardHeader>
        <CardTitle className="font-normal text-center text-lg ">
          {merchant.businessName}
        </CardTitle>
        <CardDescription className="text-center text-green-600 font-bold">
          {merchant.phone}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default SellerCard;
