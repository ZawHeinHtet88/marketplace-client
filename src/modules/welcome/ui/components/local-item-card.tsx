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
import { FeaturedProduct } from "../../types";
import { useNavigate } from "react-router-dom";

function LocalItemCard({ product }: { product: FeaturedProduct }) {
  const { addToCart } = useCartStore((state) => state);
  const navigate = useNavigate()
  const item = {
    _id: product.id,
    title: product.name,
    category: product.category,
    price: product.price,
    img: product.images[0],
  };
  return (
    <Card onClick={() => navigate(`/products/${product.id}`)} className="pt-0 pb-5 hover:shadow-xl transition-all duration-700 border-card">
      <div className="bg-secondary flex items-center justify-center rounded-xl">
        <img className="h-[200px] w-full object-cover" src={product.images[0]} alt="logo" />
      </div>
      <CardContent className="space-y-2">
        <CardTitle className="text-lg font-bold line-clamp-2">{product.name}</CardTitle>
        <CardTitle className="flex items-center gap-2">
          <img className="w-4 h-4" alt={product.merchant.logo} />
          <p className="text-accent-foreground line-clamp-1">{product.merchant.businessName}</p>
        </CardTitle>
      </CardContent>
      <CardFooter className="justify-between">
        <CardDescription className="text-lg font-extrabold text-green-600">
          {product.price} kyats
        </CardDescription>
        <Button onClick={(e) => {
          e.stopPropagation(); // Prevent card click
          addToCart(item);
        }} className="bg-primary">
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LocalItemCard;
