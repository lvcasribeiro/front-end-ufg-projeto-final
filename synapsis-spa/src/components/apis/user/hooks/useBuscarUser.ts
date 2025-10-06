import { useQuery } from "@tanstack/react-query";
import { getUserMe } from "../api/user-requests";

export default function useBuscarUsuario() {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["usuario"],
    queryFn() {
      return getUserMe();
    },
  });

  return {
    usuario: data,
    isLoadingUsuario: isLoading,
    errorLoadingUsuario: "Houve um erro ao carregar os dados",
    loadUsuario: refetch,
  };
}
