import { api } from "@/lib/axios";
import { GetAllOrdersApiResponse } from "../types/api";

export const getAllOrders = async (filters: any) => {
  const res = await api.get<GetAllOrdersApiResponse>(`/user/orders`, {
    params: filters,
  });

  return res.data;
};
