import { useQuery } from "@tanstack/react-query";
import { getAdminId, getAllMessages } from "../api";

export const useGetAllMessagesQuery = (id: string) => {
  return useQuery({
    queryKey: ["messages", id],
    queryFn: () => getAllMessages(id),
    enabled: id.length > 0, // Only run the query if id is truthy
  });
};

export const useGetAdminIdQuery = () => {
  return useQuery({
    queryKey: ["adminId"],
    queryFn: getAdminId,
  });
};
