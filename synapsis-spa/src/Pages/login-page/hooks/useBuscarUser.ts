import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../../components/user/api/user-requests";

type Params = {
  page?: number;
  perPage?: number;
  name?: string;
  email?: string;
};

export default function useBuscarUsers({ page, perPage, name, email }: Params) {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["users", page, perPage, name, email],
    queryFn() {
      return fetchUsers({
        page,
        perPage,
        name,
        email,
      });
    },
  });

  return {
    users: data?.data,
    meta: data?.meta,
    isLoadingUsers: isLoading,
    errorLoadingSUsers: "Houve um erro ao carregar os dados",
    loadUsers: refetch,
  };
}
