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
import { useCartStore } from "@/modules/cart/store/index.store";
import {
  Box,
  DollarSign,
  MoreHorizontal,
  ShoppingCart,
  ViewIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "../../type";

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCartStore();
  const item = {
    _id: product.id,
    title: product.name,
    category: product.category.name,
    price: product.price,
    img : product.images[0]
  };
  return (
    <Card className="pb-2">
      <CardContent className="flex items-center gap-5 h-[100px]">
        <img className="w-[60px] h-[60px]" src={product.images[0]} alt={product.name} />
        <div className="space-y-2">
          <CardTitle className="line-clamp-2">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </CardDescription>
          <span>
            <Badge variant={"outline"}>{product.category.name}</Badge>
          </span>
        </div>
      </CardContent>
      <CardFooter className="justify-between pt-3 border-t-2">
        <div className="flex gap-5">
          <Badge className="bg-green-600 text-background">
            <DollarSign />
            {product.price}
          </Badge>
          <Badge className="bg-orange-600 text-background">
            <Box />{product.inventory}
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
                <Button onClick={() => addToCart(item)} size={"icon"}>
                  <ShoppingCart />
                </Button>
                <Link to={"/products/34"}>
                  <Button size={"icon"} className="bg-green-600">
                    <ViewIcon />
                  </Button>
                </Link>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
