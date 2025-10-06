import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../components/config/queryClient";
import type { Notas } from "../../../components/apis/notas-requests/types/notas";
import { createNota, updateNota } from "../../../components/apis/notas-requests/api/notas-requests";

export default function useSalvarNota() {
  const { mutate, isPending } = useMutation({
    mutationFn(params: Notas) {
      if (params.id) {
        return updateNota(params);
      }
      return createNota(params);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["conteudo"] }),
  });

  return {
    salvarNota: mutate,
    isSalvandoNota: isPending,
    error: "Houve um erro ao salvar os dados",
  };
}