import Ads from "../ui/components/ads";
import { Banners } from "../ui/components/banners";
import LocalItems from "../ui/components/local-items";
import RecommendedProductList from "../ui/components/recommended-product";
import Sellers from "../ui/components/sellers";
import { TopCategories } from "../ui/components/top-categories";

export const WelcomePage = () => {
  return (
    <section className="space-y-18 my-10">
      <Banners />
      <RecommendedProductList/>
      <LocalItems/>
      <TopCategories/>
      <Ads/>
      <Sellers/>
    </section>
  );
};
