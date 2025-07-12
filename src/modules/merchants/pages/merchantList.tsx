import { useState } from "react";
import MerchantCard from "../ui/components/merchant-card";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/axios";
import { GetAllMerchantsApiResponse } from "../types/api";
import { Merchant } from "../types";

function MerchantListPage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [merchants, setMerchants] = useState<Merchant[]>([]);


  const next = async () => {
    setLoading(true);
    /**
     * Intentionally delay the search by 800ms before execution so that you can see the loading spinner.
     * In your app, you can remove this setTimeout.
     **/
    setTimeout(async () => {
      const res = await api.get(`/user/merchants?limit=8&page=${page}`);
      const data = (await res.data) as GetAllMerchantsApiResponse;
      setMerchants((prev) => [...prev, ...data.data]);
      setPage((prev) => prev + 1);
      const numberOfPage = data?.total && Math.ceil(data?.total / 8);

      // Usually your response will tell you if there is no more data.
      if (page === numberOfPage) {
        setHasMore(false);
      }
      setLoading(false);
    }, 800);
  };
  return (
    <section className="my-10">
      <h4 className="text-xl text-primary underline mb-5">Merchants</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {merchants.map((merchant, index) => (
          <MerchantCard merchant={merchant} key={index} />
        ))}
      </div>
      <InfiniteScroll
        hasMore={hasMore}
        isLoading={loading}
        next={next}
        threshold={100}
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
