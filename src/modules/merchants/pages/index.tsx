import BreadCrumps from "@/components/ui/breadcrumps";
import { HeroSection } from "../ui/components/hero-section";
import NewFeeds from "../ui/components/newfeeds";
import SellerItems from "../ui/components/seller-items";
import { useParams } from "react-router-dom";

export const MerchantPage = () => {
  const {id} = useParams()
  return (
    <section className="my-10 space-y-10">
      <BreadCrumps
        breadcrumbs={[
          { label: "Merchants", href: "/merchants" },
          { label: id ||"", href: "/merchants/43"  },
        ]}
      />
      <HeroSection />
      <div className="flex flex-col lg:flex-row gap-10">
        <SellerItems />
        <NewFeeds />
      </div>
    </section>
  );
};
