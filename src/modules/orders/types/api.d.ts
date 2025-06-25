import { Order, PlacedOrder } from ".";

export interface GetAllOrdersApiResponse {
  status: string;
  orders: Order[];
  isSuccess: boolean;
}

export interface SingleOrderApiResponse {
  status: string;
  order : PlacedOrder[];
  amount : number
}