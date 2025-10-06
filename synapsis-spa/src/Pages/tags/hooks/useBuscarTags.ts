import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "../../../components/apis/tags-requests/api/tags-requests";

type Params = {
  page?: number;
  size?: number;
  nome?: string;
};

export default function useBuscarTags({ page, size, nome }: Params) {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["tags", page, size, nome],
    queryFn() {
      return fetchTags({
        page,
        size,
        nome,
      });
    },
  });

  return {
    tags: data?.data,
    meta: data?.meta,
    isLoadingTags: isLoading,
    errorLoadingTags: "Houve um erro ao carregar os dados",
    loadTags: refetch,
  };
}
