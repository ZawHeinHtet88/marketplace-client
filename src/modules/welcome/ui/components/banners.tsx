"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BannerCard from "./banner-card";

const slides = [
  {
    id: 1,
    title: "Fresh Ayeyarwaddy River Fish",
    highlight: "DAILY FRESH CATCH",
    discount: "UP TO 30% OFF",
    image: "/fresh-fish-from-ayeyarwaddy-river.png",
    category: "Seafood",
  },
  {
    id: 2,
    title: "Premium Myanmar Rice",
    highlight: "DELTA GROWN RICE",
    discount: "BULK ORDERS 20% OFF",
    image: "/premium-myanmar-rice-bags.png",
    category: "Grains",
  },
  {
    id: 3,
    title: "Traditional Handicrafts",
    highlight: "HANDMADE CRAFTS",
    discount: "SPECIAL DEALS",
    image: "/traditional-myanmar-handicrafts.png",
    category: "Crafts",
  },
];

export function Banners() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/90 via-primary/80 to-primary/80 text-white shadow-2xl">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <BannerCard key={slide.id} slide={slide} current={current} />
        ))}
      </div>

      <Button
        variant="ghost"
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </Button>

      <Button
        variant="ghost"
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-8 h-1 rounded-full transition-all duration-300 ${
              index === current ? "bg-white" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
