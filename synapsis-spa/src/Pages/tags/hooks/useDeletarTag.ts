import { useMutation } from "@tanstack/react-query";
import { deleteTag } from "../../../components/apis/tags-requests/api/tags-requests";

export default function useDeletarTag() {
  const { mutate, error, isPending } = useMutation({
    mutationFn({ id }: { id: number }) {
      return deleteTag({ id });
    },
  });

  return {
    deletarTag: mutate,
    isDeletandoTag: isPending,
    error: "Houve um erro ao excluir a tag",
  };
}
