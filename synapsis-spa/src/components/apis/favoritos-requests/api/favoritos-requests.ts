import axios from "axios";
import type { Favoritos } from "../types/favoritos";

const apiClient = axios.create({
  baseURL: "http://localhost:5005/api/v1",
});

apiClient.interceptors.request.use(
  (config) => {
    const tokenFromStorage = localStorage.getItem("tokenSynapsis");
    if (tokenFromStorage) {
      // Faz o parse para remover as aspas extras e atribui ao cabeçalho
      const token = JSON.parse(tokenFromStorage);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

type FetchFavoritosResult = {
  data: Favoritos[];
  meta: any;
};

type FetchFavoritoParams = {
  id: number;
};

type PostFavoritoParams = {
  conteudoId: number;  
}

export async function fetchFavoritos(): Promise<FetchFavoritosResult> {
  const { data } = await apiClient.get(`/favoritos/usuario`);

  return data;
}

export async function getFavorito({ id }: FetchFavoritoParams): Promise<Favoritos> {
  const { data } = await apiClient.get(`/favoritos/${id}`);

  return data;
}

export async function createFavorito(params: PostFavoritoParams): Promise<Favoritos> {
    const { data } = await apiClient.post('/favoritos',
    params );

    return data;
}

export async function deleteFavorito({ id }: { id: number }): Promise<void> {
  await apiClient.delete(`/favoritos/${id}`);
}