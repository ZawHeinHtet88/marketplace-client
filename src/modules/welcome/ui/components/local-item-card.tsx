import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/modules/cart/store/index.store";
import { ShoppingCart } from "lucide-react";

function LocalItemCard() {
  const { addToCart } = useCartStore((state) => state);
  const item = {
    _id : "1",
    title: "soap",
    category: "furniture",
    price: 400,
  };
  return (
    <Card className="pt-0 pb-5 hover:shadow-xl transition-all duration-700 border-card">
      <div className="bg-secondary flex items-center justify-center rounded-xl">
        <img className="h-[200px]" src="./m-logo.png" alt="logo" />
      </div>
      <CardContent className="space-y-2">
        <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
        <CardTitle className="flex items-center gap-2">
          <img className="w-4 h-4" src="./vite.svg" alt="" />
          <p className="text-accent-foreground">{item.category}</p>
        </CardTitle>
      </CardContent>
      <CardFooter className="justify-between">
        <CardDescription className="text-lg font-extrabold text-green-600">
          {item.price} kyats
        </CardDescription>
        <Button onClick={() => addToCart(item)} className="bg-primary">
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LocalItemCard;
