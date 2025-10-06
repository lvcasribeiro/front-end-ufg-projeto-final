import apiClient from "../../../../hooks/apiClient";
import type { NotasFavoritas } from "../types/NotasFavoritas";

export async function fetchNotasFavoritas(): Promise<NotasFavoritas[]> {
  const { data } = await apiClient.get("/favoritos/usuario");
  return data;
}
