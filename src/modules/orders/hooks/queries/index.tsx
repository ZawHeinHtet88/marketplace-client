import { useQuery } from "@tanstack/react-query";
import { getAllOrders, getOrder } from "../../api";

export const useGetAllOrdersQuery = (filters: any) => {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => getAllOrders(filters),
  });
};

export const useGetOrderQuery = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
  });
};
