import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "../../store/index.store";
import { CartItem } from "../../type";
import { getImageUrl } from "./../../../../utils/images";
import { useTranslation } from "react-i18next";

function CartItemCard({ item }: { item: CartItem }) {
  const { addQuantity, subQuantity, removeFromCart } = useCartStore(
    (state) => state
  );
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 border-b py-4">
      {/* Product Info */}
      <div className="flex items-start gap-4 sm:w-[40%]">
        <img
          className="w-[80px] h-[80px] rounded-md object-cover flex-shrink-0"
          src={getImageUrl({ resource: "optimize", fileName: item.img })}
          alt={item.title}
        />
        <div className="flex-1 space-y-1">
          <h5 className="text-base sm:text-lg font-semibold text-primary line-clamp-2">
            {item.title}
          </h5>
          <p className="text-foreground/70 text-sm">{item.category}</p>
          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-600 text-sm hover:underline"
          >
            {t("remove")}
          </button>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 sm:w-[30%] justify-start sm:justify-center">
        <Button
          onClick={() => subQuantity(item._id)}
          variant="ghost"
          size="icon"
          className="text-primary"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <Input
          type="number"
          min={0}
          disabled
          className="w-[60px] text-center text-primary sm:w-[70px]"
          value={item.quantity}
        />
        <Button
          onClick={() => addQuantity(item._id)}
          variant="ghost"
          size="icon"
          className="text-primary"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Price */}
      <div className="flex justify-between sm:justify-end sm:w-[30%] gap-4 sm:gap-6 mt-2 sm:mt-0">
        <p className="font-bold text-primary/70">{item.price}</p>
        <p className="text-lg text-green-600 font-semibold">
          {item.price * item.quantity}
        </p>
      </div>
    </div>
  );
}

export default CartItemCard;
