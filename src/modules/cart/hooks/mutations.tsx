import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession, createOrder } from "../api";

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: createOrder,
  });

export const useCreateCheckOutSessionMutation = () =>
  useMutation({
    mutationFn: createCheckoutSession,
  });
