import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useIsMyanmar } from "@/hooks/use-language";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "react-i18next";
import { useGetAllAdsQuery } from "../../hooks/queries";
import AdsCard from "./ads-card";

function Ads() {
  const { data, isLoading } = useGetAllAdsQuery();
  const { t } = useTranslation();
  const { isMyanmar } = useIsMyanmar();
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between mb-5 border-b-1">
        <h5 className="text-lg text-gray-500 font-semibold border-b-4 pb-4 border-primary">
          {t("ads_from_partners")}
          {!isMyanmar() && (
            <span className="capitalize text-primary"> Partanership </span>
          )}
        </h5>
       
      </div>
      {isLoading ? (
        <AdsSkeleton />
      ) : (
        <div className="">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className=""
          >
            <CarouselContent className="-ml-1">
              {data?.data.map((ad, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <AdsCard ad={ad} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </section>
  );
}

export default Ads;

const AdsSkeleton = () => (
  <div className="flex gap-4">
    {[...Array(3)].map((_, i) => (
      <Card key={i} className="animate-pulse md:basis-1/2 lg:basis-1/3 h-56">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="bg-gray-200 rounded-lg h-24 w-full mb-2" />
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-1" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </CardContent>
      </Card>
    ))}
  </div>
);
