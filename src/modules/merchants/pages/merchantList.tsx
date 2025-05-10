import { useState } from "react";
import MerchantCard from "../ui/components/merchant-card";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Loader2 } from "lucide-react";

interface DummyProductResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

interface DummyProduct {
  id: number;
  title: string;
  price: string;
}

function MerchantListPage() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState<DummyProduct[]>([]);

  const next = async () => {
    setLoading(true);
    /**
     * Intentionally delay the search by 800ms before execution so that you can see the loading spinner.
     * In your app, you can remove this setTimeout.
     **/
    setTimeout(async () => {
      const res = await fetch(
        `https://dummyjson.com/products?limit=8&skip=${
          8 * page
        }&select=title,price`
      );
      const data = (await res.json()) as DummyProductResponse;
      setProducts((prev) => [...prev, ...data.products]);
      setPage((prev) => prev + 1);

      // Usually your response will tell you if there is no more data.
      if (data.products.length < 3) {
        setHasMore(false);
      }
      setLoading(false);
    }, 800);
  };
  return (
    <section className="my-10">
      <h4 className="text-xl text-primary underline mb-5">Merchants</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((products, index) => (
          <MerchantCard key={index} />
        ))}
      </div>
      <InfiniteScroll
        hasMore={hasMore}
        isLoading={loading}
        next={next}
        threshold={1}
      >
        {hasMore && (
          <div className="h-[500px] flex items-center justify-center">
            <Loader2 className="my-4 text-primary h-10 w-10 animate-spin mx-auto" />
          </div>
        )}
      </InfiniteScroll>
    </section>
  );
}

export default MerchantListPage;
