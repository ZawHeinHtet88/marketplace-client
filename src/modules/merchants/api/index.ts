import { api } from "@/lib/axios";
import { GetAllMerchantsApiResponse, GetMerchantApiResponse } from "../types/api";

export const getMerchant = async (id: string) => {
  const res = await api.get<GetMerchantApiResponse>("/user/merchants/" + id);
  return res.data;
};

export const getReliableMerchants = async () => {
  const res = await api.get<GetAllMerchantsApiResponse>("/user/merchants?limit=6");
  return res.data;
};
