import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BaggageClaim, CheckCircle, Loader, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useCheckoutSuccessMutation } from "../hooks/mutations";
import { useCartStore } from "../store/index.store";

interface OrderData {
  transcation_id: string;
  total_amount: string;
}

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { resetCart } = useCartStore(state => state)

  const session_id = searchParams.get("session_id");
  const { mutateAsync } = useCheckoutSuccessMutation();

  useEffect(() => {
    let hasFetched = false;

    async function handleOrderMutation() {
      if (hasFetched) return; // avoid double call
      hasFetched = true;

      try {
        if (!session_id) {
          setError("No session ID found");
          setIsLoading(false);
          return;
        }

        const res = await mutateAsync(session_id);

        if (res.isSuccess) {
          setOrderData({
            transcation_id: res.orderCode,
            total_amount: res.totalAmount,
          });
          resetCart();
          toast.success("Order Successfully");
        } else {
          setError("Failed to process payment");
        }
      } catch (err) {
        setError("An error occurred while processing your payment");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    handleOrderMutation();
  }, [session_id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-primary">Payment Error</h1>
          <p className="text-foreground/70 mt-2">{error}</p>
          <Link to="/products">
            <Button variant="outline">Return to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Payment Successful!
            </h1>
            <p className="text-foreground/70 mt-2">
              Thank you for your purchase. Your payment has been processed
              successfully.
            </p>
          </div>
        </div>

        {/* Transaction Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Transaction Details
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Completed
              </Badge>
            </CardTitle>
            <CardDescription>
              Your order confirmation and receipt details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Transaction ID
                </p>
                <p className="text-sm font-mono p-2 rounded">
                  {orderData?.transcation_id || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>{orderData?.total_amount || "0"}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Receipt sent to your email
                  </p>
                  <p className="text-sm text-blue-700">
                    A detailed receipt has been sent to your email
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link className="flex-1" to={"/products"}>
            <Button className="w-full">
              <BaggageClaim className="w-4 h-4 mr-2" />
              Go to Product List
            </Button>
          </Link>
         
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at support@company.com</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;