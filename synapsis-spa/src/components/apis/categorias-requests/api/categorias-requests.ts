import axios from "axios";
import type { Categorias } from "../types/categorias";

const apiClient = axios.create({
  baseURL: "http://localhost:5005/api/v1",
});

apiClient.interceptors.request.use(
  (config) => {
    const tokenFromStorage = localStorage.getItem("tokenSynapsis");
    if (tokenFromStorage) {
      // Faz o parse para remover as aspas extras e atribui ao cabeçalho
      const token = JSON.parse(tokenFromStorage);
      console.log({token});
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


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

export async function fetchCategorias(
  params: FetchCategoriasParams
): Promise<FetchCategoriasResult> {
  const { data } = await apiClient.get('/categorias', { params });
  return data;
}

export async function getCategoria({ id }: FetchCategoriaParams): Promise<Categorias> {
  const { data } = await apiClient.get(`/categorias/${id}`);
  return data;
}

export async function createCategoria(params: Categorias): Promise<Categorias> {
  const { data } = await apiClient.post('/categorias', params);
  return data;
}

export async function updateCategoria(params: Categorias): Promise<Categorias> {
  const { id, ...rest } = params;
  const { data } = await apiClient.put(`/categorias/${id}`, rest);
  return data;
}

export async function deleteCategoria({ id }: { id: number }): Promise<void> {
  await apiClient.delete(`/categorias/${id}`);
}