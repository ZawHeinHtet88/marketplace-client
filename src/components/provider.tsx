import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./theme-provider";
import { SocketProvider } from "./../context/socketContext";

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: ReactNode }) => {
  const userInfo = { _id: "123", name: "Zaw Hein Htet" }; // get from auth/store

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <SocketProvider userInfo={userInfo}>{children}</SocketProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
