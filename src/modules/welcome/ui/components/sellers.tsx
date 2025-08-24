import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SellerCard from "./seller-card";
import { useGetReliableMerchant } from "@/modules/merchants/hooks/queries";
import SkeletonCards from "@/components/ui/skeleton-card";
import { useTranslation } from "react-i18next";
import { useIsMyanmar } from "@/hooks/use-language";

function Sellers() {
  const { data, isLoading } = useGetReliableMerchant();
  const { t } = useTranslation();
  const { isMyanmar } = useIsMyanmar();
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between  mb-5 border-b-1">
        <h5 className="text-lg text-gray-500 font-semibold border-b-4 pb-4 border-primary">
          {t("reliable_merchants")}
          {!isMyanmar() && <span className="capitalize text-primary"> {t("merchants")}</span>}
        </h5>
        <Link className="flex gap-2 text-primary pb-4" to="/merchants">
          {t("view_all")} <ChevronRight />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {isLoading
          ? SkeletonCards({ count: 6 })
          : data?.data.map((merchant) => (
              <SellerCard key={merchant.id} merchant={merchant} />
            ))}
      
      </div>
    </section>
  );
}

export default Sellers;
