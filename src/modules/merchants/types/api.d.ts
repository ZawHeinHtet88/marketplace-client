import { Pagination } from "@/types/global";
import { Merchant } from ".";

export interface GetAllMerchantsApiResponse {
  status: string;
  pagination : Pagination;
  data: Merchant[];
  isSuccess: boolean;
}

export interface GetMerchantApiResponse {
  status : string;
  data:Merchant
  isSuccess : true
}
