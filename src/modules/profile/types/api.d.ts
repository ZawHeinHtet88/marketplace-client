import { BaseApiResponse } from "@/types/global";
import { Customer } from ".";

export interface getProfileApiResponse extends BaseApiResponse {
  data: {
    customer: Customer;
  };
}
