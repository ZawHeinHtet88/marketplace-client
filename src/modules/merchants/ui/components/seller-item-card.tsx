import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Box, DollarSign, MoreHorizontal, ShoppingCart, ViewIcon } from "lucide-react";

function SellerItemCard() {
  return (
    <Card className="pb-2">
      <CardContent className="flex items-center gap-5">
        <img className="w-[60px] h-[60px]" src="../vite.svg" alt="" />
        <div className="space-y-2">
          <CardTitle>Soap Strawberry</CardTitle>
          <CardDescription className="line-clamp-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            reiciendis ducimus fuga consectetur repellat perferendis,
            consequuntur molestias dignissimos. Commodi iusto consequatur, velit
            fugiat consequuntur hic deserunt quo optio est sint!
          </CardDescription>
          <span>
            <Badge variant={"outline"}>Mobile</Badge>
          </span>
        </div>
      </CardContent>
      <CardFooter className="justify-between pt-3 border-t-2">
        <div className="flex gap-5">
          <Badge className="bg-green-600">
            <DollarSign />
            3400
          </Badge>
          <Badge className="bg-orange-600">
            <Box />4
          </Badge>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <MoreHorizontal />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-1/">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Actions</h4>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button size={"icon"}><ShoppingCart/></Button>
                <Button size={"icon"} className="bg-green-600"><ViewIcon/></Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}

export default SellerItemCard;
