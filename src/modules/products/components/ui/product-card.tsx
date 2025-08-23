import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/modules/cart/store/index.store";
import { getImageUrl } from "@/utils/images";
import { Box, ShoppingCart, ViewIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Product } from "../../type";

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = product.inventory ?? 1;

  const item = {
    _id: product.id,
    title: product.name,
    category: product.category.name,
    price: product.price,
    img: product.optimize_images?.[0] ?? "",
    quantity,
  };

  const handleAddToCart = () => {
    if (quantity > maxQuantity) {
      toast.error(`Cannot order more than ${maxQuantity} items.`);
      return;
    }
    addToCart(item);
    toast.success("Added to cart!");
  };

  return (
    <Card className="flex pt-0 flex-col h-full rounded-2xl shadow-md border-none bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 hover:scale-[1.01] transition-transform duration-200">
      <div className="relative w-full h-[160px] rounded-t-2xl overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={getImageUrl({
            resource: "optimize",
            fileName: product.optimize_images?.[0] ?? "",
          })}
          alt={product.name}
        />
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge className="bg-primary text-xs px-2 py-1 rounded shadow">
            {product.category.name}
          </Badge>
        </div>
        <div className="absolute bottom-2 right-2 flex gap-1">
          <Badge className="bg-green-600 text-white text-xs px-2 py-1 rounded shadow">
            {product.price} kyats
          </Badge>
          <Badge className="bg-orange-600 text-white text-xs px-2 py-1 rounded shadow flex items-center gap-1">
            <Box className="w-4 h-4" />
            {product.inventory}
          </Badge>
        </div>
      </div>
      <CardContent className="flex flex-col flex-1 px-3 py-2 gap-1">
        <CardTitle className="text-base font-bold text-primary line-clamp-2 min-h-[2rem]">
          {product.name}
        </CardTitle>
        <div
          className="text-foreground/80 text-xs line-clamp-2 mb-1"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">Available:</span>
          <span className="font-bold text-green-600 text-xs">
            {maxQuantity}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">Qty:</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="px-2 py-0 h-6"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </Button>
          <span className="font-semibold text-primary text-base">
            {quantity}
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="px-2 py-0 h-6"
            disabled={quantity >= maxQuantity}
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
          >
            +
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 px-3 pb-3 pt-2">
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-primary font-bold py-2 rounded-lg shadow hover:bg-primary/90 transition"
        >
          <ShoppingCart className="mr-2" /> Add to Cart
        </Button>
        <Link to={`/products/${product.id}`} className="flex-1">
          <Button className="w-full bg-green-600 text-white font-bold py-2 rounded-lg shadow hover:bg-green-700 transition">
            <ViewIcon className="mr-2" /> View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
