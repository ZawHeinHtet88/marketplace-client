import { useMutation } from "@tanstack/react-query";
import { cashOnDelivery, checkoutSuccess, createCheckoutSession, createOrder } from "../api";

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

export const useCashOnDeliveryMutation = () =>
  useMutation({
    mutationFn : cashOnDelivery
  })
