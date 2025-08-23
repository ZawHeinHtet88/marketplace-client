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
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  useCashOnDeliveryMutation,
  useCreateCheckOutSessionMutation,
} from "@/modules/cart/hooks/mutations";
import { formatDate } from "@/utils/format-date";
import { CreditCard, DollarSign, FileText, Loader } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useGetOrderQuery } from "../hooks/queries";
import { QueryClient } from "@tanstack/react-query";
import { getImageUrl } from "@/utils/images";

function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const [paymentType, setPaymentType] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = new QueryClient()
  const {
    mutateAsync: createCheckoutSessionMutation,
    isPending: isCheckoutPending,
  } = useCreateCheckOutSessionMutation();

  const {
    mutateAsync: cashOnDeliveryMutation,
    isPending: isCashOnDeliveryPending,
  } = useCashOnDeliveryMutation();

  const handleCheckout = async (orderId: string) => {
    if (paymentType === "cashOnDelivery") {
      const res = await cashOnDeliveryMutation({ code: orderId });
      if (res.isSuccess) {
        toast.success("Order Successfully");
        setDialogOpen(false); // Close dialog
        queryClient.invalidateQueries({ queryKey: ["order"] });
      }
    } else {
      const res = await createCheckoutSessionMutation({ code: orderId });

      if (res.isSuccess) {
        setDialogOpen(false); // Close dialog before redirect
        window.location.href = res.url;
      } else {
        toast.error("Can't checkout");
      }
    }
    setDialogOpen(false); // Close dialog
  };
  const { data, isLoading } = useGetOrderQuery(id!);

  if (isLoading) {
    return <div className="w-full min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 min-h-screen space-y-5">
      <BreadCrumps
        breadcrumbs={[
          { label: "Orders", href: "/orders" },
          {
            label: data?.order[0]?.code || "",
            href: `/orders/${data?.order[0].code}`,
          },
        ]}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-primary text-lg font-semibold">
            Order - {data?.order[0]?.code}
          </h1>
          {data?.order[0]?.status === "pending" ? (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  disabled={isCheckoutPending || isCashOnDeliveryPending}
                  onClick={() => setDialogOpen(true)}
                >
                  <DollarSign />
                  Cash
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl">
                <div className="space-y-4">
                  <Label className="text-base font-medium">
                    Select Payment Type
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
                            "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-6 transition-all peer-checked:bg-emerald-50 hover:bg-gray-50",
                            paymentType === "stripe" && "border-primary"
                          )}
                        >
                          <CreditCard className="mb-3 h-8 w-8 text-gray-400 peer-checked:text-emerald-600" />
                          <span className="font-medium text-gray-900">
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
                            "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-6 transition-all peer-checked:bg-emerald-50 hover:bg-gray-50",
                            paymentType === "cashOnDelivery" && "border-primary"
                          )}
                        >
                          <FileText className="mb-3 h-8 w-8 text-gray-400 peer-checked:text-emerald-600" />
                          <span className="font-medium text-gray-900">
                            Cash on Delivery
                          </span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <DialogFooter className="">
                  <Button
                    onClick={() => handleCheckout(data?.order[0]?.code ?? "")}
                    type="button"
                    disabled={isCashOnDeliveryPending}
                  >
                    {isCashOnDeliveryPending ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Check out"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            ""
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="md:w-[10px]">No</TableCell>
              <TableCell className="md:w-[100px]">Image</TableCell>
              <TableCell className="md:w-[200px]">Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Shipping Cost</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Is Delivered</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.order.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    className="w-[30px] h-[30px] object-cover rounded-2xl"
                    src={getImageUrl({resource:"images", fileName:item.productId.images[0]})}
                    alt={item.productId.name}
                  />
                </TableCell>
                <TableCell>{item.productId.name}</TableCell>

                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.productId.price} MMK</TableCell>
                <TableCell>{item.productId.shipping} MMK</TableCell>
                <TableCell>{item.total} MMK</TableCell>
                <TableCell className="capitalize">{item.status} </TableCell>
                <TableCell className="capitalize">
                  {item.isDelivered ? "Yes" : "No"}{" "}
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8}>Total</TableCell>
              <TableCell colSpan={2} className="text-right">{data?.amount} MMK</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default OrderDetails;
