import { useAuthStore } from "@/modules/auth/store/index.store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthStore((state) => state);

  return isAuthenticated ? children : <Navigate to={"/login"} />;
};
