import { useQuery } from "@tanstack/react-query";
import { getAllMessages } from "../api";

export const useGetAllMessagesQuery = (id: string) => {
  return useQuery({
    queryKey: ["messages", id],
    queryFn: () => getAllMessages(id),
  });
};