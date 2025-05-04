import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    title: "Best Deal Online on smart watches",
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
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#8B0000] to-[#1C1C1C]  text-white">
      {/* Slide Content */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id + index}
            className="w-full flex-shrink-0 px-10 md:px-30 flex justify-between items-center min-h-[300px]"
          >
            <div>
              <h4 className="text-xl mb-2 font-semibold">
                Best Deal Online on smart watches
              </h4>
              <h1 className="text-5xl font-bold">{slide.highlight}</h1>
              <p className="mt-2 text-2xl">{slide.discount}</p>
              {/* Dots */}
              <div className="mt-6 flex gap-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === current ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
            <img
              src={"./m-logo.png"}
              alt="Smart Watch"
              width={250}
              height={250}
              className="object-contain hidden md:flex"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <Button
        variant={"ghost"}
        onClick={prevSlide}
        className="absolute w-[80px] h-[80px] left-[-20px] top-1/2 -translate-y-1/2 md:bg-white rounded-full"
      >
        <ChevronLeft className="md:text-red-600 !w-10 !h-10" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute w-[80px] h-[80px] right-[-20px] top-1/2 -translate-y-1/2 md:bg-white rounded-full"
      >
        <ChevronRight className="md:text-red-600 !w-10 !h-10" />
      </Button>
    </div>
  );
}
