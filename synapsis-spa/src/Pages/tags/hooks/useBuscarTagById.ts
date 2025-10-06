import { useQuery } from "@tanstack/react-query";
import { getTag } from "../../../components/apis/tags-requests/api/tags-requests";

type Params = {
  id: number;
};

export default function useBuscarNotaById({ id }: Params) {
  const { isLoading, refetch, error, data } = useQuery({
    queryKey: ["tag", id],
    queryFn() {
      return getTag({ id });
    },
    enabled: !!id,
  });

  return {
    errorFetchingTag: "Houve um erro ao carregar os dados",
    isLoadingTag: isLoading,
    loadTag: refetch,
    tag: data,
  };
}
