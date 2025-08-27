import { api } from "@/lib/axios";
import {
  AllAdsApiResponse,
  AllFeaturedProductsApiResponse,
  AllPopularTypeApiResponse,
  AllRecommendedProductsApiResponse,
} from "../types/api";

export const getAllFeaturedProducts = async () => {
  const res = await api.get<AllFeaturedProductsApiResponse>(
    "/user/products/featured"
  );

  return res.data;
};

export const getAllPopularTypes = async () => {
  const res = await api.get<AllPopularTypeApiResponse>("/user/popular-types");
  return res.data;
};

export const getAds = async () => {
  const res = await api.get<AllAdsApiResponse>("/user/ads");
  return res.data;
};

export const recommendedProducts = async () => {
  const res = await api.get<AllRecommendedProductsApiResponse>(
    `/user/products/recommend`
  );

  return res.data;
};
