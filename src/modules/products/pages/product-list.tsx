
import ProductCard from "@/components/ui/product/product-card";
import FilterModal from "../components/filter-modal";
import FilterNavigator from "../components/filter-navigator";
import Pagination from "../components/pagination";

const products = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

function ProductListPage() {

  return (
    <section className="flex gap-5 my-10">
      <div className="hidden md:block">
        <FilterNavigator/>
      </div>
      <div className="w-full md:w-[75%] space-y-5">
        <FilterModal/>
        {/* <Card className="border-card">
          <CardContent className="h-[500px] gap-5 flex flex-col items-center justify-center">
            <div className="w-[70px] h-[70px] flex rounded-full items-center justify-center bg-accent">
              <Search className="w-7 h-7 text-primary"/>
            </div>
            <p className="text-lg text-foreground/80 capitalize font-bold">There is no  items found</p>
          </CardContent>
        </Card> */}

        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-5 ">
          {products.map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
        <Pagination page={70} totalPages={100} onPageChange={()=>{}}/>
      </div>
    </section>
  );
}

export default ProductListPage;
