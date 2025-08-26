import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/modules/auth/store/index.store";
import { Calendar, Mail, MapPin, User } from "lucide-react";
import { useGetProfileQuery } from "../hooks/queries";
import { ProfileEditForm } from "../ui/components/form";
import { getImageUrl } from "@/utils/images";

// Sample customer data based on the provided structure
// const customerData = {
//   customer: {
//     shippingAddresse: {
//       street: "Min lan",
//       city: "Maubin",
//       state: "Ayeyarwaddy",
//       country: "Myanmar",
//       postalCode: "3344343443",
//     },
//     _id: "68ab0ffb6c0a52767b258782",
//     name: "Tin Aung Cho",
//     email: "tinaungcho@gmail.com",
//     role: "customer",
//     createdAt: "2025-08-24T13:13:31.565Z",
//     updatedAt: "2025-08-24T13:22:49.229Z",
//     __v: 0,
//     id: "68ab0ffb6c0a52767b258782",
//   },
// };

export default function ProfilePage() {
  const { user } = useAuthStore((state) => state);
  const { data, isLoading } = useGetProfileQuery(user?.id ?? "");

  if (isLoading) return "Loading...";
  const { customer } = data!.data;
  const createdDate = new Date(customer.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedDate = new Date(customer.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <Avatar className="mx-auto h-24 w-24">
            <AvatarImage src={getImageUrl({ resource: "optimize", fileName: customer.optimize_images })} alt={customer.name} />
            <AvatarFallback className="text-2xl font-heading bg-primary text-primary-foreground">
              {customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              {customer.name}
            </h1>
            <p className="text-muted-foreground mt-2">Customer Account</p>
            <Badge variant="secondary" className="mt-2 capitalize">
              {customer.role}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information Card */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="font-heading flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <ProfileEditForm customer={customer} />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-mono text-sm">{customer.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address Card */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="font-heading flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Shipping Address
              </CardTitle>
              <ProfileEditForm customer={customer} />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">
                  {customer.shippingAddresse?.street}
                </p>
                <p className="text-muted-foreground">
                  {customer.shippingAddresse?.city},{" "}
                  {customer.shippingAddresse?.state}
                </p>
                <p className="text-muted-foreground">
                  {customer.shippingAddresse?.country}{" "}
                  {customer.shippingAddresse?.postalCode}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Details Card */}
          <Card className="shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Account Created
                  </p>
                  <p className="font-medium">{createdDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{updatedDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="font-medium">Save Changes</Button>
          <Button variant="outline">Change Password</Button>
          <Button variant="destructive">Delete Account</Button>
        </div> */}
      </div>
    </div>
  );
}
