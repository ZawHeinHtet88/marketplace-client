import { Product } from ".";

export interface getAllProductApiResponse {
  status: string;
  results: number;
  total: number;
  data: Product[];
}

export interface getAllProductFilters {
  page: number;
  limit: number;
  "price[gt]"?: number;
  "price[lt]"?: number;
}
