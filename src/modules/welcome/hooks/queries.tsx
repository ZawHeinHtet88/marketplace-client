import { useQuery } from "@tanstack/react-query"
import { getAds, getAllFeaturedProducts, getAllPopularTypes, recommendedProducts } from "../api"

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

export const useGetAllRecommendedProductsQuery = () => {
    return useQuery({
        queryKey : ["recommended-products"],
        queryFn : recommendedProducts
    })
}