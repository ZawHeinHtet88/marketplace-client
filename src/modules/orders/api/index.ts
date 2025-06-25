import { api } from "@/lib/axios";
import { GetAllOrdersApiResponse, SingleOrderApiResponse } from "../types/api";

export const getAllOrders = async (filters: any) => {
  const res = await api.get<GetAllOrdersApiResponse>(`/user/orders`, {
    params: filters,
  });

  return res.data;
};

export const getOrder = async (orderId: string) => {
  const res = await api.get<SingleOrderApiResponse>(`/user/orders/${orderId}`);

  return res.data;
}