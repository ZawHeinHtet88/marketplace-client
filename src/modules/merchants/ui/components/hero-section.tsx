import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import SellerStat from "./seller-stat";

export const HeroSection = () => {
  return (
    <Card className="">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-[60px] h-[60px]">
            <AvatarImage src="../login_image.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">Su Nay Chi</h3>
            <span className="text-green-600">last active 1 min ago</span>
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
