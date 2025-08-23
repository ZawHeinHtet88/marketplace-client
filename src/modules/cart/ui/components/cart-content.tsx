import { useCartStore } from "../../store/index.store";
import CartItemCard from "./cart-item-card";

function CartContent() {
  const { cart } = useCartStore((state) => state);
  return (
    <section className="space-y-5 overflow-x-scroll md:overflow-x-hidden">
      <header className="hidden md:flex items-center gap-10 text-left uppercase font-semibold text-foreground/50">
        <div className="w-[40%]">Products Detail</div>
        <div className="w-[30%]">Quantity</div>
        <div className="w-[15%]">Price</div>
        <div className="w-[20%]">Total(KYATS)</div>
      </header>
      <div className="h-[400px] flex flex-col md:overflow-x-hidden overflow-y-scroll gap-10">
        {cart.map((item, index) => (
          <CartItemCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

export default CartContent;
