import { useQuery } from "@tanstack/react-query";
import { fetchNotasArquivadas } from "../../../components/apis/notas-requests/api/notas-requests";

type Params = {
  page?: number;
  perPage?: number;
};

export default function useBuscarNotasArquivadas({ page, perPage }: Params) {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["conteudoArquivado", page, perPage],
    queryFn() {
      return fetchNotasArquivadas({
        page,
        perPage,
      });
    },
  });

  return {
    notasArquivadas: data?.data,
    meta: data?.meta,
    isLoadingNotasArquivadas: isLoading,
    errorLoadingNotasArquivadas: "Houve um erro ao carregar os dados",
    loadNotas: refetch,
  };
}
