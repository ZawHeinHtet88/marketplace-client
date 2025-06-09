import { api } from "@/lib/axios";
import {
  getAllProductApiResponse,
  getAllProductFilters,
} from "./../type/api.d";

export const getAllProducts = async (filters: getAllProductFilters) => {
  const res = await api.get<getAllProductApiResponse>(`/user/products`, {
    params: filters,
  });
  return res.data;
};
