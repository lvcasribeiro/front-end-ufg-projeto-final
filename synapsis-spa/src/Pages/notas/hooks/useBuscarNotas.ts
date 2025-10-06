import { useQuery } from "@tanstack/react-query";
import { fetchNotas } from "../../../components/apis/notas-requests/api/notas-requests";

type Params = {
  page?: number;
  size?: number;
  titulo?: string;
  tag?: string;
  status?: string;
};

export default function useBuscarNotas({ page, size, titulo, tag, status }: Params) {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["notas", page, size, titulo, tag, status],
    queryFn() {
      return fetchNotas({
        page,
        size,
        titulo, 
        tag, 
        status,
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
