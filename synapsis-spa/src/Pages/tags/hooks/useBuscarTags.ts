import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "../../../components/apis/tags-requests/api/tags-requests";

type Params = {
  page?: number;
  perPage?: number;
};

export default function useBuscarTags({ page, perPage}: Params) {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["tags", page, perPage],
    queryFn() {
      return fetchTags({
        page,
        perPage,
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
