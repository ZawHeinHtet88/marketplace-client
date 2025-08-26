import { api } from "@/lib/axios";
import { BaseApiResponse } from "@/types/global";
import { getProfileApiResponse } from "../types/api";

export const getProfile = async (id: string) => {
  const res = await api.get<getProfileApiResponse>(`/user/profile/${id}`);

  return res.data;
};

export const updateProfile = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const res = await api.patch<BaseApiResponse>(`/user/profile/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
