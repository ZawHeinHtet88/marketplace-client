"use client";

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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CreditCard, FileText, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useCashOnDeliveryMutation,
  useCreateCheckOutSessionMutation,
  useCreateOrderMutation,
} from "../../hooks/mutations";
import { useCartStore } from "../../store/index.store";
import CartContent from "./cart-content";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function CartModal() {
  const { cart, totalAmount, resetCart } = useCartStore((state) => state);
  const navigate = useNavigate();
  const [orderCode, setOrderCode] = useState("");
  const [isOrderStarting, setIsOrderStarting] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const {
    mutateAsync: createOrderMutateAsync,
    isPending: isOrderPending,
    isSuccess,
  } = useCreateOrderMutation();

  const {
    mutateAsync: createCheckoutSessionMutation,
    isPending: isCheckoutPending,
    isSuccess: isCheckoutSuccess,
  } = useCreateCheckOutSessionMutation();

  const {
    mutateAsync: cashOnDeliveryMutation,
    isPending: isCashOnDeliveryPending,
  } = useCashOnDeliveryMutation();

  // Move state update into useEffect to prevent infinite loop
  useEffect(() => {
    if (isSuccess) {
      setIsOrderStarting(true);
    }
    if (isCheckoutSuccess) setIsOrderStarting(false);
  }, [isSuccess, isCheckoutSuccess]);

  const handleOrder = async () => {
    const products = cart
      .map((item) => `${item.quantity}_${item._id}`)
      .join("#");
    const res = await createOrderMutateAsync(products);
    if (res.isSuccess) {
      setOrderCode(res.code);
    }
  };

  const handleCheckout = async () => {
    if (paymentType === "cashOnDelivery") {
      const res = await cashOnDeliveryMutation({ code: orderCode });
      if (res.isSuccess) {
        resetCart();
        toast.success("Order Created Successfully");
        setIsOrderStarting(false);
        setIsModalOpen(false);
        navigate("/");
      }
    } else {
      const res = await createCheckoutSessionMutation({ code: orderCode });
      if (isSuccess) {
        resetCart();
        window.location.href = res.url;
      }
    }
    setIsOrderStarting(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="border-0 bg-transparent" variant="outline">
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
            {t("cart")}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl dark:bg-neutral-900 overflow-hidden">
        <DialogClose
          className={
            "text-red-500 hover:text-red-600 " +
            "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          }
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-semibold text-2xl text-primary">
            <ShoppingCart className="text-green-600 !w-7 !h-7" />
            {t("cart_items")}
          </DialogTitle>
          <DialogDescription className="text-left">
            {t("thank_for_shopping")}
          </DialogDescription>
        </DialogHeader>
        <Separator className="dark:bg-neutral-700 w-full" />
        {isOrderStarting ? (
          <div className="space-y-4">
            <Label className="text-base font-medium dark:text-neutral-200">
              {t("select_paymant")}
            </Label>
            <RadioGroup value={paymentType} onValueChange={setPaymentType}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="relative">
                  <RadioGroupItem
                    value="stripe"
                    id="stripe"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="stripe"
                    className={cn(
                      "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-6 transition-all peer-checked:bg-emerald-50 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700",
                      paymentType === "stripe" &&
                        "border-primary dark:border-primary"
                    )}
                  >
                    <CreditCard className="mb-3 h-8 w-8 text-gray-400 peer-checked:text-emerald-600 dark:text-neutral-400 dark:peer-checked:text-emerald-400" />
                    <span className="font-medium text-gray-900 dark:text-neutral-100">
                      {" "}
                      Stripe{" "}
                    </span>
                    <span className="mt-1 text-center text-sm text-gray-500 dark:text-neutral-400">
                      {" "}
                      {t("cash_on_internet")}{" "}
                    </span>
                  </Label>
                </div>
                <div className="relative">
                  <RadioGroupItem
                    value="cashOnDelivery"
                    id="cashOnDelivery"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="cashOnDelivery"
                    className={cn(
                      "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-6 transition-all peer-checked:bg-emerald-50 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700",
                      paymentType === "cashOnDelivery" &&
                        "border-primary dark:border-primary"
                    )}
                  >
                    <FileText className="mb-3 h-8 w-8 text-gray-400 peer-checked:text-emerald-600 dark:text-neutral-400 dark:peer-checked:text-emerald-400" />
                    <span className="font-medium text-gray-900 dark:text-neutral-100">
                      {" "}
                      {t("cash_on_delivery")}{" "}
                    </span>
                    <span className="mt-1 text-center text-sm text-gray-500 dark:text-neutral-400">
                      {" "}
                      {t("cash_product")}{" "}
                    </span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        ) : !cart.length ? (
          <div className="flex flex-col items-center justify-center space-x-2 h-[400px]">
            <img
              className="w-[200px] h-[200px]"
              src="/empty-cart.gif"
              alt="sds"
            />
            <p className="text-xl font-bold text-primary">
              {t("there_no_items_found")}
            </p>
          </div>
        ) : (
          <CartContent />
        )}
        <Separator className="dark:bg-neutral-700" />
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold text-primary">
            {t("total_cost")} -{" "}
            <span className="text-green-600 dark:text-green-400">
              {totalAmount}
            </span>
          </p>
          {isOrderStarting ? (
            <Button
              onClick={handleCheckout}
              disabled={
                !cart.length ||
                isCheckoutPending ||
                isCashOnDeliveryPending ||
                !paymentType
              }
              className="bg-green-600 text-white dark:bg-green-700"
            >
              {t("checkout")}
            </Button>
          ) : (
            <Button
              onClick={handleOrder}
              disabled={!cart.length || isOrderPending}
              className="bg-green-600 text-white dark:bg-green-700"
            >
              {isOrderPending ? t("ordering") : t("make_order")}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CartModal;
