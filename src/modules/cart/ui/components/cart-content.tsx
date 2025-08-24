import { useTranslation } from "react-i18next";
import { useCartStore } from "../../store/index.store";
import CartItemCard from "./cart-item-card";

function CartContent() {
  const { cart } = useCartStore((state) => state);
  const {t} = useTranslation()
  return (
    <section className="space-y-5 overflow-x-scroll md:overflow-x-hidden">
      <header className="hidden md:flex items-center gap-10 text-left uppercase font-semibold text-foreground/50">
        <div className="w-[40%]">{t("product_details")}</div>
        <div className="w-[30%]">{t("quantity")}</div>
        <div className="w-[15%]">{t("price")}</div>
        <div className="w-[20%]">{t("total_kyats")}</div>
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
