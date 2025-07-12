import { useQuery } from "@tanstack/react-query"
import { getMerchant } from "../api"


export const useGetMerchantQuery = (id: string) => {
    return useQuery({
        queryKey: ['merchant'],
        queryFn: () => getMerchant(id)
    })
}