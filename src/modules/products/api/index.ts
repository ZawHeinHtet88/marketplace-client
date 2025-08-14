import { api } from "@/lib/axios";
import {
  getAllCategoriesApiResponse,
  getAllProductApiResponse,
  getAllProductFilters,
  getAllTypesApiResponse,
  SearchProductsApiResponse,
  SingleProductApiResponse,
} from "./../type/api.d";

export const getAllProducts = async (filters: getAllProductFilters) => {
  const res = await api.get<getAllProductApiResponse>(`/user/products`, {
    params: filters,
  });
  return res.data;
};

export const getAllTypes = async () => {
  const res = await api.get<getAllTypesApiResponse>(`/user/types`);
  return res.data;
};

export const getAllCategories = async() => {
  const res = await api.get<getAllCategoriesApiResponse>("/user/categories");
  return res.data
}

export const getProduct = async (id: string) => {
  const res = await api.get<SingleProductApiResponse>(`/user/products/${id}`);
  return res.data;
}

// export const getRelatedProduct = async() => {
//   const res = await api.get
// }

export const searchProduct = async (search: string) => {
  const res = await api.get<SearchProductsApiResponse>("/user/products/search", { params: {q:search} });
  return res.data
}