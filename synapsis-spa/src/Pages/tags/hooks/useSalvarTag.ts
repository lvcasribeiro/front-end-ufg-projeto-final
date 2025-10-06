import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../components/config/queryClient";
import type { Tags } from "../../../components/apis/tags-requests/types/tags";
import { createTag, updateTag } from "../../../components/apis/tags-requests/api/tags-requests";

export default function useSalvarTag() {
  const { mutate, isPending } = useMutation({
    mutationFn(params: Tags) {
      if (params.id) {
        return updateTag(params);
      }
      return createTag(params);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });

  return {
    salvarTags: mutate,
    isSalvandoTags: isPending,
    error: "Houve um erro ao salvar os dados",
  };
}