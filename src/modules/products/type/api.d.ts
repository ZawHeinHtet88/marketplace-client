import { Pagination } from "@/types/global";
import { Product, Type } from ".";

export interface getAllProductApiResponse extends BasePag {
  status: string;
  isSuccess: boolean;
  data: Product[];
  pagination : Pagination;
  merchant?: string
}

export interface getAllProductFilters {
  page: number;
  limit: number;
  "price[gt]"?: number;
  "price[lt]"?: number;
  type?: string;
  sort?: string; // e.g., "price", "createdAt"
}

export interface SingleProductApiResponse {
  message: string;
  product:Product
}

export interface getAllTypesApiResponse {
  status: string;
  results: number;
  total: number;
  data: Type[];
}

export interface SearchProductsApiResponse{
  message : string,
  isSuccess : boolean,
  product : {name:string}[]
}