import { useMutation } from "@tanstack/react-query";
import { deleteNota } from "../../../components/apis/notas-requests/api/notas-requests";

export default function useDeletarNota() {
  const { mutate, error, isPending } = useMutation({
    mutationFn({ id }: { id: number }) {
      return deleteNota({ id });
    },
  });

  return {
    deletarNota: mutate,
    isDeletandoNota: isPending,
    error: "Houve um erro ao excluir os dados",
  };
}
