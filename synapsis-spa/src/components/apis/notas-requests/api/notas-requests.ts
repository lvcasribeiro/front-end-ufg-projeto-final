import axios from "axios";
import type { Notas } from "../types/notas";

type FetchNotasParams = {
  page?: number;
  perPage?: number;
};

type FetchNotasResult = {
  data: Notas[];
  meta: any;
};

type FetchNotaParams = {
  id: number;
};

export async function fetchNotas({
  page,
  perPage,
}: FetchNotasParams): Promise<FetchNotasResult> {
  const { data } = await axios.get(`http://localhost:5005/api/v1/conteudos`, {
    params: {
      page,
      perPage,
    },
  });

  return data;
}

export async function getNota({ id }: FetchNotaParams): Promise<Notas> {
  const { data } = await axios.get(
    `http://localhost:5005/api/v1/conteudos/${id}`
  );

  return data;
}

export async function createNota(params: Notas): Promise<Notas> {
    const { data } = await axios.post(
    'http://localhost:5005/api/v1/conteudos',
    params );

    return data;
}

export async function updateNota(params: Notas): Promise<Notas> {
  const { id, ...data } = params;
  const { data: response } = await axios.put(
    `http://localhost:5005/api/v1/conteudos/${id}`,
    data
  );
  return response;
}

export async function deleteNota({ id }: { id: number }): Promise<void> {
  await axios.delete(`http://localhost:5005/api/v1/conteudos/${id}`);
}