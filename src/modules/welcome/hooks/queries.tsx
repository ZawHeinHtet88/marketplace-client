import { useQuery } from "@tanstack/react-query"
import { getAds, getAllFeaturedProducts, getAllPopularTypes } from "../api"

export const useGetAllFeaturedProductQuery = () => {
    return useQuery(
        {
            queryKey: ['featured-products'],
            queryFn: getAllFeaturedProducts
        }
    )
}

export const useGetAllPopularTypeQuery = () => {
    return useQuery({
        queryKey : ['popular-type'],
        queryFn : getAllPopularTypes
    })
}

export const useGetAllAdsQuery = () => {
    return useQuery({
        queryKey : ["ads"],
        queryFn : getAds
    })
}