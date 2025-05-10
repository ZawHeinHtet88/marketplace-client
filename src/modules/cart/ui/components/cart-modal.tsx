import { ShoppingCart, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useCartStore } from "../../store/index.store";
import CartContent from "./cart-content";

function CartModal() {
  const { cart, totalAmount } = useCartStore((state) => state);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-0" variant="outline">
          <ShoppingCart className="text-primary !w-6 !h-6" />
          {cart.length > 0 && (
            <sup>
              <Badge>{cart.length}</Badge>
            </sup>
          )}

          <span
            className={cn(
              "font-semibold text-secondary-foreground",
              cart.length && "hidden"
            )}
          >
            Cart
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        {/* Customize the close button color (keeps original positioning) */}
        <DialogClose
          className={
            "text-red-500 hover:text-red-600 " + // Your color changes
            "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" // Default classes
          }
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader className="">
          <DialogTitle className="flex items-center gap-2 font-semibold text-2xl text-primary">
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
            <p className="text-xl font-bold text-primary">
              Your cart is empty now
            </p>
          </div>
        ) : (
          <CartContent />
        )}

        <Separator />
        <div className=" flex justify-between items-center">
          <div className="">
            <p className="text-lg font-semibold text-primary">
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
