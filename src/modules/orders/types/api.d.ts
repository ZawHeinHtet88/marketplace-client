import { Order } from ".";

export interface GetAllOrdersApiResponse {
  status: string;
  orders: Order[];
  isSuccess: boolean;
}
