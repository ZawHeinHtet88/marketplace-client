import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "../../store/index.store";
import CartContent from "./cart-content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function CartModal() {
  const { cart, totalAmount } = useCartStore((state) => state);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-0" variant="outline">
          <ShoppingCart className="text-red-600 !w-6 !h-6" />
          {cart.length > 0 && (
            <sup>
              <Badge>{cart.length}</Badge>
            </sup>
          )}

          <span
            className={cn(
              "font-semibold text-gray-600",
              cart.length && "hidden"
            )}
          >
            Cart
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader className="">
          <DialogTitle className="flex items-center gap-2 font-semibold text-2xl">
            <ShoppingCart className="text-green-600 !w-7 !h-7" />
            Cart Items
          </DialogTitle>
          <DialogDescription>
            {/* Your cart is empty! Ready to find something special? */}
            Thank you for shopping with us! Review your items below.{" "}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {!cart.length ? (
          <div className="flex flex-col items-center justify-center space-x-2 h-[400px]">
            <img
              className="w-[200px] h-[200px]"
              src="./empty-cart.gif"
              alt=""
            />
            <p className="text-xl font-bold text-gray-800/80">
              Your cart is empty now
            </p>
          </div>
        ) : (
          <CartContent />
        )}

        <Separator />
        <div className=" flex justify-between items-center">
          <div className="">
            <p className="text-lg font-semibold">
              Total Cost - <span className="text-green-600">{totalAmount}</span>
            </p>
          </div>
          <Button disabled={!cart.length} className="bg-green-600">
            Check Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CartModal;
