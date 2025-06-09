import ProductSkeletonCard from "./ui/skeleton-card";

function Skeletons() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-5 ">
      {Array?.from({length:9}).map((_, i) => (
        <ProductSkeletonCard key={i}/>
      ))}
    </div>
  );
}

export default Skeletons;
