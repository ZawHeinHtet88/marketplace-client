import { useQuery } from "@tanstack/react-query"
import { getMerchant, getReliableMerchants } from "../api"


export const useGetMerchantQuery = (id: string) => {
    return useQuery({
        queryKey: ['merchant'],
        queryFn: () => getMerchant(id)
    })
}

export const useGetReliableMerchant = ()=> {
    return useQuery({
        queryKey:['reliable-merchants'],
        queryFn : getReliableMerchants
    })
}