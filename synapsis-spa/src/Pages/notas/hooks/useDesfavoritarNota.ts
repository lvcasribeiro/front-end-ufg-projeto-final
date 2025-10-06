import { useMutation } from "@tanstack/react-query";
import { deleteFavorito } from "../../../components/apis/favoritos-requests/api/favoritos-requests";

export default function useDesfavoritarNota() {
  const { mutate, error, isPending } = useMutation({
    mutationFn({ id }: { id: number }) {
      return deleteFavorito({ id });
    },
  });

  return {
    desfavoritarNota: mutate,
    isDesfavoritandoNota: isPending,
    error: "Houve um erro ao desfavoritar a nota",
  };
}
