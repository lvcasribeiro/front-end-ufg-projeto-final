import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        if (
          error instanceof AxiosError &&
          (error.response?.status == 401 || error.response?.status == 403 || error.response?.status == 404)
        ) {
          return false;
        }

        return failureCount < 3;
      },
      gcTime: 0,
      staleTime: 0,
    },
  },
});
