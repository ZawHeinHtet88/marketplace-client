import { toast } from "sonner";
import { CartItem, Product } from "../type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: CartItem[];
  totalAmount: number;
  addToCart: (item: Product) => void;
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
      addToCart: (item: Product) => {
        const isExistItem = get().cart.some(
          (cartItem) => cartItem._id === item._id
        );
        if (isExistItem) {
          set((state) => ({
            cart: state.cart.map((cartItem) =>
              cartItem._id === item._id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          }));
        } else {
          set((state) => ({
            cart: [...state.cart, { ...item, quantity: 1 }],
          }));
        }
        toast.success(`Adding ${item.title} Successfully`);
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
            if(item._id === id && item.quantity >= 20) {
              toast.warning("You can add only 20 quantity per product.")
              return item
            }
            return item._id === id ? { ...item, quantity: item.quantity + 1 } : item;
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
        // Check if value is 0 and set a timeout to remove the item after 1 second
        if (value === 0) {
          const timeoutId = setTimeout(() => {
            removeFromCartAutomatically(); // Assuming you have a function that removes the item
          }, 1000);

          // Clear the timeout if the value is updated again (prevents unnecessary remove)
          return () => clearTimeout(timeoutId);
        }
        updateTotal();
      },
      resetCart: () =>
        set(() => ({
          cart: [],
          totalAmount : 0
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
