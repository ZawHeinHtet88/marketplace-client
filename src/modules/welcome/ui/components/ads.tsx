import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import AdsCard from "./ads-card";
import { useGetAllAdsQuery } from "../../hooks/queries";

 function Ads() {
  const {data} = useGetAllAdsQuery()
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between mb-5 border-b-1">
        <h5 className="text-lg text-gray-500 font-semibold border-b-4 pb-4 border-primary">
          Ads from
          <span className="capitalize text-primary"> Partanership </span>
        </h5>
        <Link className="flex gap-2 text-primary pb-4" to="">
          View All <ChevronRight />
        </Link>
      </div>

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
            {data?.data.map((ad ,index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <AdsCard ad={ad}/>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default Ads;
