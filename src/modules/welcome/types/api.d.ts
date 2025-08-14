import { Ad, FeaturedProduct, PopularType } from ".";

export interface AllFeaturedProductsApiResponse {
  messge: string;
  products: FeaturedProduct[];
}

export interface AllPopularTypeApiResponse {
  message: string;
  isSuccess: boolean;
  types: PopularType[];
}

export interface AllAdsApiResponse {
  status: string;
  isSuccess: string;
  data : Ad[]
}
