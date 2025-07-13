import BreadCrumps from "@/components/ui/breadcrumps";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCreateCheckOutSessionMutation } from "@/modules/cart/hooks/mutations";
import { formatDate } from "@/utils/format-date";
import { DollarSign } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useGetOrderQuery } from "../hooks/queries";

function OrderDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    mutateAsync: createCheckoutSessionMutation,
    isPending: isCheckoutPending,
  } = useCreateCheckOutSessionMutation();


  const handleCheckout = async (orderId: string) => {

    const res = await createCheckoutSessionMutation({ code: orderId })

    if (res.isSuccess) {
      window.location.href = res.url;
    } else {
      toast.error("Can't checkout")
    }

  }
  const { data, isLoading } = useGetOrderQuery(id!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 h-screen space-y-5">
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
        <h1 className="text-primary text-lg font-semibold">
          Order - {data?.order[0]?.code}
        </h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="w-[10px]">No</TableCell>
              <TableCell className="w-[100px]">Image</TableCell>
              <TableCell className="w-[200px]">Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Shipping Cost</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Is Delivered</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.order.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    className="w-[30px] h-[30px] object-cover rounded-2xl"
                    src={item.productId.images[0]}
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
                <TableCell>
                  {
                    item.status === "pending" ?
                      <Button onClick={() => handleCheckout(item.code)} disabled={isCheckoutPending }><DollarSign />Cash</Button> : "-"
                  }
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={10}>Total</TableCell>
              <TableCell className="text-right">{data?.amount} MMK</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default OrderDetails;
