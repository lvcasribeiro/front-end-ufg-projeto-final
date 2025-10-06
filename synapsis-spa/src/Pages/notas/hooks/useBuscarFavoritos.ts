import { useQuery } from "@tanstack/react-query";
import { fetchFavoritos } from "../../../components/apis/favoritos-requests/api/favoritos-requests";

export default function useBuscarFavoritos() {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["favoritos"],
    queryFn() {
      return fetchFavoritos();
    },
  });

  return {
    favoritos: data,
    isLoadingFavoritos: isLoading,
    errorLoadingFavoritos: "Houve um erro ao carregar os dados",
    loadFavoritos: refetch,
  };
}
