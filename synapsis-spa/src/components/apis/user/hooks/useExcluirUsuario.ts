import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../api/user-requests";

export function useExcluirUsuario() {
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
  });
}
