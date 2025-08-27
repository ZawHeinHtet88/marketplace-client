import SkeletonCards from "@/components/ui/skeleton-card";
import ProductCard from "@/modules/products/components/ui/product-card";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useGetAllRecommendedProductsQuery } from "../../hooks/queries";

export default function RecommendedProductList() {
  const { t } = useTranslation();
  const {data,isLoading} = useGetAllRecommendedProductsQuery() 
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between  mb-5 border-b-1">
        <h5 className="text-lg text-gray-500 font-semibold border-b-4 pb-4 border-primary">
          {t("recommended_products")}
        </h5>
        <Link to="/products" className="flex gap-2 text-primary pb-4">
          {t("view_all")} <ChevronRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading
          ? SkeletonCards({ count: 8 })
          : data?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
}
