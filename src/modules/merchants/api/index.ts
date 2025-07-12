import { api } from "@/lib/axios"
import { GetMerchantApiResponse } from "../types/api";

export const getMerchant = async (id: string) => {
    const res = await api.get<GetMerchantApiResponse>('/user/merchants/' + id);
    return res.data
}