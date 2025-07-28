import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useParams } from "react-router-dom";
import { useGetMerchantQuery } from "../../hooks/queries";
import SellerStat from "./seller-stat";
import { getImageUrl } from "@/utils/images";

export const HeroSection = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetMerchantQuery(id || "");

  // if(!merchant) return "No merchant"
  if (isLoading) return "Loading";
  const merchant = data?.data;

  return (
    <Card className="">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PhotoProvider>
            <PhotoView
              src={getImageUrl({ resource: "images", fileName: merchant?.logo })}
            >
              <Avatar className="w-[60px] h-[60px] hover:cursor-pointer">
                <AvatarImage
                  src={getImageUrl({
                    resource: "images",
                    fileName: merchant?.logo,
                  })}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PhotoView>
          </PhotoProvider>
          <div>
            <h3 className="text-xl font-semibold">{merchant?.businessName}</h3>
            <span className="text-green-600">
              Address : {merchant?.address.full}
            </span>
            <p>Phone : {merchant?.phone}</p>
          </div>
        </div>
        <div>
          <Button variant={"outline"}>
            <Mail /> Contact Seller
          </Button>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        <SellerStat />
        <SellerStat />
        <SellerStat />
        <SellerStat />
        <SellerStat />
        <SellerStat />
      </CardFooter>
    </Card>
  );
};
