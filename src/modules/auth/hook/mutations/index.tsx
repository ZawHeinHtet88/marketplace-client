import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../../api";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: login,
  });

export const useSignupMutation = () =>
  useMutation({
    mutationFn: signup,
  });