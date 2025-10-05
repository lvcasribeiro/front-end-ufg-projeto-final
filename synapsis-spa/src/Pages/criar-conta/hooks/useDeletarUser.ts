import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../../components/user/api/user-requests";

export default function useDeletarUser() {
  const { mutate, error, isPending } = useMutation({
    mutationFn({ id }: { id: number }) {
      return deleteUser({ id });
    },
  });

  return {
    deletarUser: mutate,
    isDeletandoUser: isPending,
    error: "Houve um erro ao excluir os dados",
  };
}
