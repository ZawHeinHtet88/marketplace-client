import { useMutation } from "@tanstack/react-query";
import { googleLogin, login, signup } from "../../api";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: login,
  });

export const useSignupMutation = () =>
  useMutation({
    mutationFn: signup,
  });

export const useGoogleLoginMutation = () =>
  useMutation({
    mutationFn: googleLogin
  })