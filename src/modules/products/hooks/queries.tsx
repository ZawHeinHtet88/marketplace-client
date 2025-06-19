import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getAllTypes, getProduct } from "../api";
import { getAllProductFilters } from "../type/api";

export const useGetAllProductsQuery = (filters: getAllProductFilters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => getAllProducts(filters),
  });
};

export const useGetProductQuery = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
};

export const useGetAllTypesQuery = () => {
  return useQuery({
    queryKey: ["types"],
    queryFn: getAllTypes,
  });
}
  