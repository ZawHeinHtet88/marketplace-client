import { HeroSection } from "../ui/components/hero-section";
import NewFeeds from "../ui/components/newfeeds";
import SellerItems from "../ui/components/seller-items";

export const MerchantPage = () => {
  return (
    <section className="my-10 space-y-10">
      <HeroSection />
      <div className="flex flex-col lg:flex-row gap-10">
        <SellerItems />
        <NewFeeds />
      </div>
    </section>
  );
};
