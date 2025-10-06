import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../components/config/queryClient";
import type { PostFavoritoParams } from "../../../components/apis/favoritos-requests/types/favoritos";
import { createFavorito } from "../../../components/apis/favoritos-requests/api/favoritos-requests";

export default function useFavoritarNota() {
  const { mutate, isPending } = useMutation({
    mutationFn(conteudoId: PostFavoritoParams) {
      return createFavorito(conteudoId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["conteudo"] }),
  });

  return {
    favoritarNota: mutate,
    isFavoritandoNota: isPending,
    error: "Houve um erro ao favoritar a nota",
  };
}