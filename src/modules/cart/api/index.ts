import { api } from "@/lib/axios";
import { CheckoutSessionApiResponse, CheckoutSuccessApiResponse, OrderApiRespones } from "../type/api";

export const createOrder = async (products: string) => {
  const res = await api.post<OrderApiRespones>(`/user/order`, {
    products,
  });
  return res.data;
};

export const createCheckoutSession = async ({ code }: { code: string }) => {
  const res = await api.post<CheckoutSessionApiResponse>(
    `/user/create-checkout-session`,
    {
      code,
    }
  );
  return res.data;
};

export const cashOnDelivery = async ({code}:{code:string}) => { 
  const res = await api.post<OrderApiRespones>(`/user/cash-on-delivery`, {
    code,
  });
  return res.data;
}

export const checkoutSuccess = async (sessionId: string) => {
  const res = await api.post<CheckoutSuccessApiResponse>(
    `user/checkout-success`,
    {
      sessionId,
    }
  );
  return res.data;
};
