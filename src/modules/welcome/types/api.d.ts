import { FeaturedProduct, PopularType } from ".";

export interface AllFeaturedProductsApiResponse{
    messge : string,
    products : FeaturedProduct[]
}

export interface AllPopularTypeApiResponse{
    message : string,
    isSuccess : boolean,
    types : PopularType[]
}