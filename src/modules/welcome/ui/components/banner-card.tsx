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
    image: "./traditional-myanmar-handicrafts.png",
    category: "Crafts",
  },
];

function BannerCard({
  slide,
  current,
}: {
  slide: {
    title: string;
    highlight: string;
    discount: string;
    image: string;
    category: string;
  };
  current: number;
}) {
  return (
    <div className="w-full flex-shrink-0 px-4 sm:px-8 md:px-16 lg:px-20 flex flex-col md:flex-row justify-between items-center min-h-[280px] sm:min-h-[320px] md:min-h-[400px] py-8">
      <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
        <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3">
          {slide.category}
        </div>

        <h4 className="text-sm sm:text-lg md:text-xl mb-2 font-medium text-white/90 leading-tight">
          {slide.title}
        </h4>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
          {slide.highlight}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white/95 mb-4">
          {slide.discount}
        </p>

        <div className="flex justify-center md:justify-start gap-2 mt-4">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
        <img
          src={slide.image || "/placeholder.svg"}
          alt={slide.title}
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}

export default BannerCard;
