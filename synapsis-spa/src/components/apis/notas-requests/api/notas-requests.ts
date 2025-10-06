import axios from "axios";
import type { Notas } from "../types/notas";

const apiClient = axios.create({
  baseURL: "http://localhost:5005/api/v1",
});

apiClient.interceptors.request.use(
  (config) => {
    const tokenFromStorage = localStorage.getItem("tokenSynapsis");
    if (tokenFromStorage) {
      // Faz o parse para remover as aspas extras e atribui ao cabeçalho
      const token = JSON.parse(tokenFromStorage);
      console.log({ token });
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

type FetchNotasParams = {
  page?: number;
  size?: number;
  titulo?: string;
  tag?: string;
  status?: string;
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
  size,
  titulo,
  tag,
  status,
}: FetchNotasParams): Promise<FetchNotasResult> {
  const { data } = await apiClient.get(`/conteudos`, {
    params: {
      page,
      size,
      titulo,
      tag,
      status,
    },
  });

  return data;
}

export async function fetchNotasArquivadas({
  page,
}: FetchNotasParams): Promise<FetchNotasResult> {
  const { data } = await apiClient.get(`/conteudos/arquivados`, {
    params: {
      page,
    },
  });
  return data;
}

export async function getNota({ id }: FetchNotaParams): Promise<Notas> {
  const { data } = await apiClient.get(`/conteudos/${id}`);

  return data;
}

export async function createNota(params: Notas): Promise<Notas> {
  const { data } = await apiClient.post("/conteudos", params);

  return data;
}

export async function updateNota(params: Notas): Promise<Notas> {
  const { id, ...data } = params;
  const { data: response } = await apiClient.put(`/conteudos/${id}`, data);
  return response;
}

export async function deleteNota({ id }: { id: number }): Promise<void> {
  await apiClient.delete(`/conteudos/${id}`);
}
