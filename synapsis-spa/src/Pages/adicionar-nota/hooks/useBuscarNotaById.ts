import { useQuery } from "@tanstack/react-query";
import { getNota } from "../../../components/apis/notas-requests/api/notas-requests"; 

type Params = {
  id: number;
};

export default function useBuscarNotaById({ id }: Params) {
  const { isLoading, refetch, error, data } = useQuery({
    queryKey: ["conteudo", id],
    queryFn() {
      return getNota({ id });
    },
    enabled: !!id,
  });

  return {
    errorFetchingStatusAndamentoProcesso: "Houve um erro ao carregar os dados",
    isLoadingNota: isLoading,
    loadNota: refetch,
    nota: data,
  };
}
