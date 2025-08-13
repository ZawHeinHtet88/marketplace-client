import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./theme-provider";
import { SocketProvider } from "./../context/socketContext";
import { useAuthStore } from "@/modules/auth/store/index.store";

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore((state) => state);

  const userInfo = {
    _id: user?.id ?? "",
    name: user?.name ?? "",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <SocketProvider userInfo={userInfo}>{children}</SocketProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
