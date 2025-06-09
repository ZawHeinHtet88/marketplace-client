import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api";
import { getAllProductFilters } from "../type/api";

export const useGetAllProductsQuery = (filters:getAllProductFilters) => {
  return useQuery({
    queryKey: ["products",filters],
    queryFn: ()=>getAllProducts(filters),
  });
};
