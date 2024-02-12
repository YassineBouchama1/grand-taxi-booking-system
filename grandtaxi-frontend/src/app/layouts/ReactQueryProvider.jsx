"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client

export default function ReactQueryProvider({
  children,
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
