import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import LocalItemCard from "./local-item-card";
import { useGetAllFeaturedProductQuery } from "../../hooks/queries";
import SkeletonCards from "@/components/ui/skeleton-card";
import { useTranslation } from "react-i18next";
import { useIsMyanmar } from "@/hooks/use-language";

function LocalItems() {
  const { data, isLoading } = useGetAllFeaturedProductQuery();
  const { t } = useTranslation();
  const { isMyanmar } = useIsMyanmar();
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between  mb-5 border-b-1">
        <h5 className="text-lg text-gray-500 font-semibold border-b-4 pb-4 border-primary">
          {t("grab_best_deals")}
          {!isMyanmar() && (
            <span className="capitalize text-primary">local items</span>
          )}
        </h5>
        <Link to="/products" className="flex gap-2 text-primary pb-4">
          {t("view_all")} <ChevronRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading
          ? SkeletonCards({ count: 8 })
          : data?.products.map((product) => (
              <LocalItemCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
}

export default LocalItems;
