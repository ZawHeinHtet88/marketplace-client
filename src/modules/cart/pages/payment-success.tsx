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
import {
    BaggageClaim,
    CheckCircle,
    Download,
    Mail
} from "lucide-react";
import { Link } from "react-router-dom";

function PaymentSuccessPage() {
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
                <p className="text-sm font-mono  p-2 rounded">
                  txn_1234567890abcdef
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
              <div className="flex justify-between items-center">
                <span className="text-sm">Premium Plan (Annual)</span>
                <span className="text-sm">$99.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Tax</span>
                <span className="text-sm">$8.91</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>$107.91</span>
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
                    A detailed receipt has been sent to john@example.com
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Card
        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
            <CardDescription>Here are your next steps to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Access your account</p>
                  <p className="text-sm text-gray-600">Your premium features are now active</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">2</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Download your invoice</p>
                  <p className="text-sm text-gray-600">Keep this for your records</p>
                </div>
                <Download className="w-4 h-4 text-gray-400" />
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">3</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Get support</p>
                  <p className="text-sm text-gray-600">Need help? Our team is here for you</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link className="flex-1" to={"/products"}>
            <Button  className="w-full">
              <BaggageClaim className="w-4 h-4 mr-2" />
              Go to Product List
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
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
