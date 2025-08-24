import i18n from "i18next";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "../type";

interface CartState {
  cart: CartItem[];
  totalAmount: number;
  addToCart: (item: Product & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  addQuantity: (id: string) => void;
  subQuantity: (id: string) => void;
  changeQuantity: (id: string, value: number) => void;
  resetCart: () => void;
}


export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalAmount: 0,
      addToCart: (item) => {
        const existingItem = get().cart.find(
          (cartItem) => cartItem._id === item._id
        );
        const addQty = item.quantity ?? 1;
        if (existingItem) {
          const newQty = existingItem.quantity + addQty;
          if (newQty > 20) {
            toast.warning(i18n.t("can_add_only"));
            return;
          }
          set((state) => ({
            cart: state.cart.map((cartItem) =>
              cartItem._id === item._id
                ? { ...cartItem, quantity: newQty }
                : cartItem
            ),
          }));
          toast.success(`Added ${addQty} ${item.title} to cart!`);
        } else {
          const qtyToAdd = addQty > 20 ? 20 : addQty;
          if (addQty > 20) {
            toast.warning(i18n.t("can_add_only"));
          }
          set((state) => ({
            cart: [...state.cart, { ...item, quantity: qtyToAdd }],
          }));
          toast.success(
            i18n
              .t("added_to_cart")
              .replace("{{item_title}}", item.title)
              .replace("{{qtyToAdd}}", item!.quantity!.toString())
          );
        }
        updateTotal();
      },
      removeFromCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((cart) => cart._id !== id),
        }));
        toast.success(`Remove from Cart`);
        updateTotal();
      },
      addQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) => {
            if (item._id === id && item.quantity >= 20) {
              toast.warning("You can add only 20 quantity per product.");
              return item;
            }
            return item._id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          }),
        }));
        updateTotal();
      },
      subQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id
              ? {
                  ...item,
                  quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                }
              : item
          ),
        }));
        updateTotal();
      },
      changeQuantity: (id: string, value: number) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, quantity: value } : item
          ),
        }));
        if (value === 0) {
          const timeoutId = setTimeout(() => {
            removeFromCartAutomatically();
          }, 1000);
          return () => clearTimeout(timeoutId);
        }
        updateTotal();
      },
      resetCart: () =>
        set(() => ({
          cart: [],
          totalAmount: 0,
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);

function updateTotal() {
  const { cart } = useCartStore.getState();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  useCartStore.setState({ totalAmount: total });
}

function removeFromCartAutomatically() {
  const { cart } = useCartStore.getState();
  const filterdCart = cart.filter((item) => item.quantity > 0);
  useCartStore.setState({ cart: filterdCart });
  updateTotal();
}
