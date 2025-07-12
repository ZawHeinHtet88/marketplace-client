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
  
function BannerCard({slide,current}:{slide:{highlight:string,discount:string},current:number}) {
  return (
    <div
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
  );
}

export default BannerCard;
