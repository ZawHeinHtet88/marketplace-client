import { api } from "@/lib/axios";
import { SingleOrderApiResponse } from "../types/api";


export const getOrder = async (orderId: string) => {
    const res = await api.get<SingleOrderApiResponse>(`/user/orders/${orderId}`);

    return res.data;
}