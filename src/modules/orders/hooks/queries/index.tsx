import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../api";

export const useGetOrderQuery = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
  });
};
