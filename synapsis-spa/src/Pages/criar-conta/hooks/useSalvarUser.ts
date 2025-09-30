import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../components/config/queryClient";
import type { User } from "../../../components/user/types/User";
import { createUser, updateUser } from "../../../components/user/api/user-requests";

export default function useSalvarUser() {
  const { mutate, isPending } = useMutation({
    mutationFn(params: User) {
      if (params.id) {
        return updateUser(params);
      }
      console.log("create", params);
      return createUser(params);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  return {
    salvarUser: mutate,
    isSalvandoUser: isPending,
    error: "Houve um erro ao salvar os dados",
  };
}