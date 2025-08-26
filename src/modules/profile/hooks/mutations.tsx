import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api";

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: updateProfile,
  });
