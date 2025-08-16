import { api } from "@/lib/axios";
import { getAllMessageApiResponse } from "../types/api";

export const getAllMessages = async (id: string) => {
  const res = await api.post<getAllMessageApiResponse>("/message", {
    data: { id },
  });

  return res.data;
};
