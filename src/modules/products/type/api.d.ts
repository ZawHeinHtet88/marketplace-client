import { Product, Type } from ".";

export interface getAllProductApiResponse {
  status: string;
  results: number;
  total: number;
  data: Product[];
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
  status: string;
  data: {
    data: Product
  };
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