import { useState } from "react";
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
import { getImageUrl } from "@/utils/images";
import { toast } from "sonner";

function LocalItemCard({ product }: { product: FeaturedProduct }) {
  const { addToCart } = useCartStore((state) => state);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const maxQuantity = product.inventory ?? 1;

  const item = {
    _id: product.id,
    title: product.name,
    category: product.category,
    price: product.price,
    img: product.optimize_images && product!.optimize_images[0],
    quantity,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > maxQuantity) {
      toast.error(`Cannot order more than ${maxQuantity} items.`);
      return;
    }
    addToCart(item);
    toast.success("Added to cart!");
  };

  return (
    <Card
      onClick={() => navigate(`/products/${product.id}`)}
      className="flex flex-col h-full pt-0 pb-5 hover:shadow-xl transition-all duration-700 border-card cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-background dark:border-neutral-800"
    >
      <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center rounded-xl p-2">
        <img
          className="h-[160px] w-full object-cover rounded-xl"
          src={getImageUrl({
            resource: "optimize",
            fileName: product.optimize_images[0],
          })}
          alt={product.name}
        />
      </div>
      <CardContent className="flex flex-col flex-1 space-y-2 px-3 pt-3">
        <CardTitle className="text-lg font-bold line-clamp-2 text-primary min-h-[2.8rem] ">
          {product.name}
        </CardTitle>
        <div className="flex items-center gap-2">
          <img
            className="w-5 h-5 rounded-full border"
            alt={product.merchant.businessName}
            src={getImageUrl({
              resource: "images",
              fileName: product.merchant.logo,
            })}
          />
          <span className="text-sm text-gray-600 font-medium dark:text-gray-300">
            {product.merchant.businessName}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Available:
          </span>
          <span className="font-bold text-green-600 dark:text-green-400">
            {maxQuantity}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Quantity:
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="px-2 py-0 dark:border-neutral-700"
            disabled={quantity <= 1}
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((q) => Math.max(1, q - 1));
            }}
          >
            -
          </Button>
          <span className="font-semibold text-primary dark:text-primary-foreground">
            {quantity}
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="px-2 py-0 dark:border-neutral-700"
            disabled={quantity >= maxQuantity}
            onClick={(e) => {
              e.stopPropagation();
              setQuantity((q) => Math.min(maxQuantity, q + 1));
            }}
          >
            +
          </Button>
        </div>
        <div className="flex-1" />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 px-3 pt-2">
        <div className="flex items-center justify-between w-full">
          <CardDescription className="text-lg font-extrabold text-green-600 dark:text-green-400">
            {product.price} kyats
          </CardDescription>
          <Button
            onClick={handleAddToCart}
            className="bg-primary flex items-center gap-2 px-4 py-2 rounded-lg dark:bg-primary dark:text-primary-foreground"
            disabled={quantity > maxQuantity}
          >
            <ShoppingCart /> Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default LocalItemCard;
