import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "../../store/index.store";
import { CartItem } from "../../type";
import { getImageUrl } from "./../../../../utils/images";
import { useTranslation } from "react-i18next";

function CartItemCard({ item }: { item: CartItem }) {
  const { addQuantity, subQuantity, removeFromCart, changeQuantity } =
    useCartStore((state) => state);
  const {t} = useTranslation()

  return (
    <div className="flex  gap-10 items-center">
      <div className="md:w-[40%] flex gap-5">
        <img
          className="w-[80px] h-[80px]"
          src={getImageUrl({ resource: "optimize", fileName: item.img })}
          alt={item.title}
        />
        <div className="h-full space-y-1 ">
          <h5 className="text-lg font-semibold text-primary line-clamp-3">
            {item.title}
          </h5>
          <p className="text-foreground/70 text-sm">{item.category}</p>
          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-600 text-sm"
          >
            {t("remove")}
          </button>
        </div>
      </div>
      <div className="md:w-[30%] flex ">
        <Button
          onClick={() => subQuantity(item._id)}
          variant={"ghost"}
          size={"icon"}
          className="text-primary"
        >
          <Minus />
        </Button>
        <Input
          type="number"
          min={0}
          disabled
          className="w-[100px] text-primary"
          onChange={(state) =>
            changeQuantity(item._id, Number(state.currentTarget.value))
          }
          value={item.quantity}
        />
        <Button
          onClick={() => addQuantity(item._id)}
          variant={"ghost"}
          size={"icon"}
          className="text-primary"
        >
          <Plus />
        </Button>
      </div>
      <div className="md:w-[15%]">
        <p className="font-bold text-primary/70">{item.price}</p>
      </div>
      <div className="md:w-[15%]">
        <p className="text-lg text-green-600 font-semibold">
          {item.price * item.quantity}
        </p>
      </div>
    </div>
  );
}

export default CartItemCard;
