import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../api";

export const useGetAllOrdersQuery = (filters: any) => {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => getAllOrders(filters),
  });
};
