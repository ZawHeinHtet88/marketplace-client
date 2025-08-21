import { api } from "@/lib/axios";
import { getAllMessageApiResponse } from "../types/api";

export const getAllMessages = async (id: string) => {
  const res = await api.post<getAllMessageApiResponse>("/message",{id});

  return res.data;
};

export const getAdminId = async () => {
  const res = await api.get("/message/admin");

  return res.data
}