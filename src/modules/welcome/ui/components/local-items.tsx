import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import LocalItemCard from "./local-item-card";

function LocalItems() {
  
  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between  mb-5 border-b-1">
        <h5 className="text-lg text-gray-500 font-semibold border-b-4 pb-4 border-primary">
          Grab the best Deal on{" "}
          <span className="capitalize text-primary">local items</span>
        </h5>
        <Link className="flex gap-2 text-primary pb-4" to="">
          View All <ChevronRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <LocalItemCard/>
        <LocalItemCard/>
        <LocalItemCard/>
        <LocalItemCard/>
        <LocalItemCard/>
      </div>
    </section>
  );
}

export default LocalItems;
