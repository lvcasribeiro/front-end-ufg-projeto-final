import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../components/config/queryClient";
import type { Categorias } from "../../../components/apis/categorias-requests/types/categorias";
import { createCategoria, updateCategoria } from "../../../components/apis/categorias-requests/api/categorias-requests";

export default function useSalvarCategoria() {
  const { mutate, isPending } = useMutation({
    mutationFn(params: Categorias) {
      if (params.id) {
        return updateCategoria(params);
      }
      return createCategoria(params);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categaoria"] }),
  });

  return {
    salvarCategoria: mutate,
    isSalvandoCategoria: isPending,
    error: "Houve um erro ao salvar os dados",
  };
}