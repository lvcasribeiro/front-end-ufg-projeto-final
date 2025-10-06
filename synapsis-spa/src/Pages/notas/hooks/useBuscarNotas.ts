import { useQuery } from "@tanstack/react-query";
import { fetchNotas } from "../../../components/apis/notas-requests/api/notas-requests";

type Params = {
  page?: number;
  perPage?: number;
};

export default function useBuscarNotas({ page, perPage}: Params) {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["conteudo", page, perPage],
    queryFn() {
      return fetchNotas({
        page,
        perPage,
      });
    },
  });

  return {
    notas: data?.data,
    meta: data?.meta,
    isLoadingNotas: isLoading,
    errorLoadingNotas: "Houve um erro ao carregar os dados",
    loadNotas: refetch,
  };
}
