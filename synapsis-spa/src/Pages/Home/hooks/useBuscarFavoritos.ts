import { useQuery } from "@tanstack/react-query";
import { fetchNotasFavoritas } from "../../../components/apis/notas-favoritas/api/notas-favoritas-requests";

export default function useBuscarFavoritos() {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["conteudoFavoritos"],
    queryFn: fetchNotasFavoritas,
  });

  return {
    notasFavoritas: data,
    isLoadingNotasFavoritas: isLoading,
    errorLoadingNotasFavoritas: error,
    loadNotas: refetch,
  };
}
