import InfiniteScroll from "@/components/ui/infinite-scroll";
import { api } from "@/lib/axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import OrderCard from "../component/order-card";
import { Order } from "../types";
import { GetAllOrdersApiResponse } from "../types/api";
import { useTranslation } from "react-i18next";

function OrderListPage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const { t } = useTranslation();

  const next = async () => {
    setLoading(true);
    /**
     * Intentionally delay the search by 800ms before execution so that you can see the loading spinner.
     * In your app, you can remove this setTimeout.
     **/
    setTimeout(async () => {
      const res = await api.get(
        `/user/orders?limit=5&page=${page}&sort=createdAt`
      );
      const data = (await res.data) as GetAllOrdersApiResponse;
      setOrders((prev) => [...prev, ...data.orders]);
      setPage((prev) => prev + 1);

      // Usually your response will tell you if there is no more data.
      if (data.orders.length < 1000) {
        setHasMore(false);
      }
      setLoading(false);
    }, 800);
  };


  return (
    <section className="max-w-4xl mx-auto my-10 min-h-screen">
      <header className="mb-5">
        <h5 className="text-2xl text-primary font-bold">{t("my_orders")}</h5>
      </header>
      <div className="rounded-2xl w-full">
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={next}
          threshold={1}
        >
          {hasMore && (
            <div className="h-[100px] flex items-center justify-center">
              <Loader2 className="my-4 text-primary h-10 w-10 animate-spin mx-auto" />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </section>
  );
}

export default OrderListPage;
