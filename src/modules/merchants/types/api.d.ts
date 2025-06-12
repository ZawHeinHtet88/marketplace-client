import { Merchant } from ".";

export interface GetAllMerchantsApiResponse {
  status: string;
  results: number;
  total: number;
  data: Merchant[];
  isSuccess: boolean;
}
