import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { useGetMerchantQuery } from "../../hooks/queries";
import { Merchant } from "../../types";

export const HeroSection = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetMerchantQuery(id || "");

  // if(!merchant) return "No merchant"
  if (isLoading) return "Loading";
  const merchant = data?.data ?? ({} as Merchant);

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Main merchant info card */}
        <Card className="md:w-[70%] w-full shadow-lg ">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="w-16 h-16 flex-shrink-0">
                <AvatarImage
                  src={merchant.optimize_logo || "/placeholder.svg"}
                  alt={`${merchant.businessName} logo`}
                />
                <AvatarFallback className="text-lg font-semibold">
                  {merchant.businessName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-foreground mb-2 text-balance">
                  {merchant.businessName}
                </h1>
                <div className="space-y-1 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Phone:</span>
                    <a
                      href={`tel:${merchant.phone}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {merchant.phone}
                    </a>
                  </p>
                  <p className="text-sm leading-relaxed">
                    {merchant.description}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact info card */}
        <Card className="shadow-lg flex-1">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Contact Information
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-muted-foreground block mb-1">
                  Email:
                </span>
                <a
                  href={`mailto:${merchant.email}`}
                  className="text-foreground hover:text-primary transition-colors break-all"
                >
                  {merchant.email}
                </a>
              </div>
              <div>
                <span className="font-medium text-muted-foreground block mb-1">
                  Address:
                </span>
                <p className="text-foreground leading-relaxed">
                  {merchant.address.full}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
