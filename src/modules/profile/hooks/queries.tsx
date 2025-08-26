import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api";

export const useGetProfileQuery = (id: string) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(id),
  });
};
