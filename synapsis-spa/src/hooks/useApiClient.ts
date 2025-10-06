import { useMemo } from "react";
import apiClient from "./apiClient";

export const useApiClient = () => {
  return useMemo(() => apiClient, []);
};
