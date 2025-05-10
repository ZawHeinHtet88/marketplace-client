import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BannerCard from "./banner-card";

const slides = [
  {
    id: 1,
    title: "Best Deal Online on smart watches",
    highlight: "SMART WEARABLE.",
    discount: "UP TO 80% OFF",
    image: "/images/smartwatch.png", // Replace with your own image
  },
  {
    id: 2,
    title: "Best Deal Online on smart nice",
    highlight: "SMART WEARABLE.",
    discount: "UP TO 80% OFF",
    image: "/images/smartwatch.png", // Replace with your own image
  },
  // Add more slides if needed
];

export function Banners() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r dark:from-accent from-primary to-secondary  text-white">
      {/* Slide Content */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <BannerCard key={index} slide={slide} current={current}/>
        ))}
      </div>

      {/* Controls */}
      <Button
        variant={"ghost"}
        onClick={prevSlide}
        className="absolute w-[80px] h-[80px] left-[-20px] top-1/2 -translate-y-1/2 md:bg-background rounded-full"
      >
        <ChevronLeft className="md:text-primary !w-10 !h-10" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute w-[80px] h-[80px] right-[-20px] top-1/2 -translate-y-1/2 md:bg-background rounded-full"
      >
        <ChevronRight className="md:text-primary !w-10 !h-10" />
      </Button>
    </div>
  );
}
