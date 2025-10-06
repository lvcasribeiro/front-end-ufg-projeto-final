import axios from "axios";
import type { Categorias } from "../types/categorias";

type FetchCategoriasParams = {
  page?: number;
  perPage?: number;
  nome?: string;
};

type FetchCategoriasResult = {
  data: Categorias[];
};

type FetchCategoriaParams = {
  id: number;
};

export async function fetchCategorias({
  page,
  perPage,
  nome,
}: FetchCategoriasParams): Promise<FetchCategoriasResult> {
  const { data } = await axios.get(`http://localhost:5005/api/v1/categorias`, {
    params: {
      page,
      perPage,
      nome,
    },
  });

  return data;
}

export async function getCategoria({ id }: FetchCategoriaParams): Promise<Categorias> {
  const { data } = await axios.get(
    `http://localhost:5005/api/v1/categorias/${id}`
  );

  return data;
}

export async function createCategoria(params: Categorias): Promise<Categorias> {
    const { data } = await axios.post(
    'http://localhost:5005/api/v1/categorias',
    params );

    return data;
}

export async function updateCategoria(params: Categorias): Promise<Categorias> {
  const { id, ...data } = params;
  const { data: response } = await axios.put(
    `http://localhost:5005/api/v1/categorias/${id}`,
    data
  );
  return response;
}

export async function deleteCategoria({ id }: { id: number }): Promise<void> {
  await axios.delete(`http://localhost:5005/api/v1/categorias${id}`);
}