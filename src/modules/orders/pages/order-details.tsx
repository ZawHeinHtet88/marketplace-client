"use client";

import BreadCrumps from "@/components/ui/breadcrumps";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSocket } from "@/context/socketContext";
import { cn } from "@/lib/utils";
import {
  useCashOnDeliveryMutation,
  useCreateCheckOutSessionMutation,
} from "@/modules/cart/hooks/mutations";
import { formatDate } from "@/utils/format-date";
import { getImageUrl } from "@/utils/images";
import { CreditCard, DollarSign, FileText, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useGetOrderQuery } from "../hooks/queries";
import OrderProgressStepper from "../ui/stepper";

function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const [paymentType, setPaymentType] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { socket } = useSocket();
  const { t } = useTranslation();

  const { data: orderQueryData, isLoading } = useGetOrderQuery(id!);
  console.log(orderQueryData);

  // Local state for order
  const [order, setOrder] = useState(orderQueryData?.order || []);

  // Mutations
  const {
    mutateAsync: createCheckoutSessionMutation,
    isPending: isCheckoutPending,
  } = useCreateCheckOutSessionMutation();
  const {
    mutateAsync: cashOnDeliveryMutation,
    isPending: isCashOnDeliveryPending,
  } = useCashOnDeliveryMutation();

  // Handle checkout
  const handleCheckout = async (orderId: string) => {
    if (paymentType === "cashOnDelivery") {
      const res = await cashOnDeliveryMutation({ code: orderId });
      if (res.isSuccess) {
        toast.success("Order Successfully");
        setDialogOpen(false);
      }
    } else {
      const res = await createCheckoutSessionMutation({ code: orderId });
      if (res.isSuccess) {
        setDialogOpen(false);
        window.location.href = res.url;
      } else {
        toast.error("Can't checkout");
      }
    }
  };

  // Update local state when initial query loads
  useEffect(() => {
    if (orderQueryData?.order) {
      setOrder(orderQueryData.order);
    }
  }, [orderQueryData?.order]);

  // Socket listener for order updates
  useEffect(() => {
    if (!socket) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onReceive = (updatedOrder: any) => {
      console.log(updatedOrder[0]);

      // Update the local state when socket data comes
      setOrder(updatedOrder);
    };

    socket.on("order-status-changed", onReceive);

    return () => {
      socket.off("order-status-changed", onReceive);
    };
  }, [socket]);

  if (isLoading)
    return <div className="w-full min-h-screen">{t("loading")}...</div>;

  const firstOrder = order[0];

  console.log("first order", firstOrder);

  return (
    <div className="max-w-6xl mx-auto my-10 min-h-screen space-y-5">
      <BreadCrumps
        breadcrumbs={[
          { label: t("order"), href: "/orders" },
          {
            label: firstOrder?.code || "",
            href: `/orders/${firstOrder?.code}`,
          },
        ]}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-primary text-lg font-semibold">
            Order - {firstOrder?.code}
          </h1>

          {firstOrder?.status === "pending" && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  disabled={isCheckoutPending || isCashOnDeliveryPending}
                  onClick={() => setDialogOpen(true)}
                >
                  <DollarSign />
                  {t("cash")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl">
                <div className="space-y-4">
                  <Label className="text-base font-medium text-primary">
                    {t("select_paymant")}
                  </Label>
                  <RadioGroup
                    value={paymentType}
                    onValueChange={setPaymentType}
                  >
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
                          <CreditCard className="mb-3 h-8 w-8 text-gray-400 peer-checked:text-emerald-600" />
                          <span className="font-medium dark:text-white">
                            Stripe
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
                          <FileText className="mb-3 h-8 w-8 text-gray-400 peer-checked:text-emerald-600" />
                          <span className="font-medium dark:text-white">
                            {t("cash_on_delivery")}
                          </span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => handleCheckout(firstOrder?.code ?? "")}
                    disabled={isCashOnDeliveryPending}
                  >
                    {isCashOnDeliveryPending ? (
                      <Loader className="animate-spin" />
                    ) : (
                      t("checkout")
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Order Progress
          </h2>
          <OrderProgressStepper
            currentStatus={firstOrder?.status || "delivered"}
            isPaid={firstOrder?.isPaid || false}
            isDelivered={firstOrder?.isDelivered || false}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>{t("number")}</TableCell>
              <TableCell>{t("image")}</TableCell>
              <TableCell>{t("product")}</TableCell>
              <TableCell>{t("quantity")}</TableCell>
              <TableCell>{t("price")}</TableCell>
              <TableCell>{t("shipping_cost")}</TableCell>
              <TableCell>{t("total")}</TableCell>
              <TableCell>{t("status")}</TableCell>
              <TableCell>{t("is_delivered")}</TableCell>
              <TableCell>{t("created_at")}</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    className="w-[30px] h-[30px] object-cover rounded-2xl"
                    src={getImageUrl({
                      resource: "images",
                      fileName: item.productId.images[0] || "/placeholder.svg",
                    })}
                    alt={item.productId.name}
                  />
                </TableCell>
                <TableCell>{item.productId.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {item.productId.price} {t("kyats")}
                </TableCell>
                <TableCell>
                  {item.productId.shipping} {t("kyats")}
                </TableCell>
                <TableCell>
                  {item.total} {t("kyats")}
                </TableCell>
                <TableCell className="capitalize">{item.status}</TableCell>
                <TableCell className="capitalize">
                  {item.isDelivered ? "Yes" : "No"}
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default OrderDetails;
