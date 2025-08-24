import { useEffect } from "react";
import BreadCrumps from "@/components/ui/breadcrumps";
import { HeroSection } from "../ui/components/hero-section";
import NewFeeds from "../ui/components/newfeeds";
import SellerItems from "../ui/components/seller-items";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const MerchantPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="my-10 space-y-10">
      <BreadCrumps
        breadcrumbs={[
          { label: t("merchants"), href: "/merchants" },
          { label: id || "", href: "/merchants/43" },
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
