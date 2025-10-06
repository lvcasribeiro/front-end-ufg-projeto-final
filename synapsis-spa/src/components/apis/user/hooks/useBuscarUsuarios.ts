import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/user-requests";

type Params = {
  page?: number;
  perPage?: number;
  name?: string;
};

export default function useBuscarUsuarios({ page, perPage, name }: Params) {
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["usuarios", page, perPage, name],
    queryFn() {
      return fetchUsers({
        page,
        perPage,
        name,
      });
    },
  });

  return {
    usuarios: data?.data,
    meta: data?.meta,
    isLoadingUsuarios: isLoading,
    errorLoadingUsuarios: error ? "Houve um erro ao carregar os dados" : null,
    loadUsuarios: refetch,
  };
}
