export interface OrderApiRespones {
  status: string;
  total: number;
  code: string;
  isSuccess: boolean;
}

export interface CheckoutSessionApiResponse {
  status: string;
  id: string;
  totalAmount: string;
  shipping: number;
  url: string;
  isSuccess: boolean;
}
