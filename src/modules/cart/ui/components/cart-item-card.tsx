import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "../../store/index.store";
import { CartItem } from "../../type";

function CartItemCard({ item }: { item: CartItem }) {
  const { addQuantity ,subQuantity,removeFromCart,changeQuantity} = useCartStore((state) => state);

  
  return (
    <div className="flex gap-10 items-center">
      <div className="w-[40%] flex gap-5">
        <img className="w-[80px] h-[80px]" src={item.img} alt={item.title} />
        <div className="h-full space-y-1">
          <h5 className="text-lg font-semibold text-primary">{item.title}</h5>
          <p className="text-foreground/70 text-sm">{item.category}</p>
          <button onClick={()=>removeFromCart(item._id)} className="text-red-600 text-sm">remove</button>
        </div>
      </div>
      <div className="w-[30%] flex ">
        <Button
          onClick={() => subQuantity(item._id)}
          variant={"ghost"}
          size={"icon"}
          className="text-primary"
        >
          <Minus />
        </Button>
        <Input type="number" min={0} className="w-[100px] text-primary" onChange={(state)=>changeQuantity(item._id,Number(state.currentTarget.value))} value={item.quantity} />
        <Button
          onClick={() => addQuantity(item._id)}
          variant={"ghost"}
          size={"icon"}
          className="text-primary"
        >
          <Plus />
        </Button>
      </div>
      <div className="w-[15%]">
        <p className="font-bold text-gray-700 ">{item.price}</p>
      </div>
      <div className="w-[15%]">
        <p className="text-lg text-green-600 font-semibold">
          {item.price * item.quantity}
        </p>
      </div>
    </div>
  );
}

export default CartItemCard;
