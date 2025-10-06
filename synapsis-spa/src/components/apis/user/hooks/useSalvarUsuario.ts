import { useMutation } from "@tanstack/react-query";
import { createUser, updateUser } from "../api/user-requests";
import type { User } from "../types/User";

export function useSalvarUsuario() {
  const criar = useMutation({
    mutationFn: (usuario: User) => createUser(usuario),
  });

  const atualizar = useMutation({
    mutationFn: (usuario: User) => updateUser(usuario),
  });

  return { criar, atualizar };
}
