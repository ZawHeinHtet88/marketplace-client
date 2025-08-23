import SkeletonCards from "@/components/ui/skeleton-card";
import { useGetAllPopularTypeQuery } from "../../hooks/queries";
import TopCategoryCard from "./top-category-card";

export const TopCategories = () => {
  const { data, isLoading } = useGetAllPopularTypeQuery();

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between mb-5 border-b-1">
        <h5 className="text-lg text-gray-500 font-semibold border-b-4 pb-4 border-primary">
          Shop From
          <span className="capitalize text-primary"> Popular Types</span>
        </h5>
        {/* <Link className="flex gap-2 text-primary pb-4" to="">
          View All <ChevronRight />
        </Link> */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
        {isLoading
          ? SkeletonCards({ count: 7 })
          : data?.types.map((type) => (
              <TopCategoryCard key={type._id} type={type} />
            ))}
      </div>
    </section>
  );
};
