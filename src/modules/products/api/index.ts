import { api } from "@/lib/axios";
import {
  getAllProductApiResponse,
  getAllProductFilters,
  getAllTypesApiResponse,
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

export const getProduct = async (id: string) => {
  const res = await api.get<SingleProductApiResponse>(`/user/products/${id}`);
  return res.data;
}
