import { useMutation } from "@tanstack/react-query";
import { checkoutSuccess, createCheckoutSession, createOrder } from "../api";

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: createOrder,
  });

export const useCreateCheckOutSessionMutation = () =>
  useMutation({
    mutationFn: createCheckoutSession,
  });

export const useCheckoutSuccessMutation = () =>
  useMutation({
    mutationFn: checkoutSuccess,
  });
