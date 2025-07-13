import { api } from "@/lib/axios";
import { AllFeaturedProductsApiResponse, AllPopularTypeApiResponse } from "../types/api";

export const getAllFeaturedProducts = async () => {
    const res = await api.get<AllFeaturedProductsApiResponse>("/user/products/featured");

    return res.data;
};

export const getAllPopularTypes = async () => {
    const res = await api.get<AllPopularTypeApiResponse>("/user/popular-types");
    return res.data
}