import axios from "axios";
import type { Tags } from "../types/tags";

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

type FetchTagsParams = {
  page?: number;
  perPage?: number;
  name?: string;
  email?: string;
};

type FetchTagsResult = {
  data: Tags[];
  meta: any;
};

type FetchTagParams = {
  id: number;
};

export async function fetchTags({
  page,
  perPage,
  name,
  email,
}: FetchTagsParams): Promise<FetchTagsResult> {
  const { data } = await axios.get(`http://localhost:5005/api/v1/tags`, {
    params: {
      page,
      perPage,
      name,
      email,
    },
  });

  return data;
}

export async function getTag({ id }: FetchTagParams): Promise<Tags> {
  const { data } = await axios.get(
    `http://localhost:5005/api/v1/tags/${id}`
  );

  return data;
}

export async function createTag(params: Tags): Promise<Tags> {
    const { data } = await axios.post(
    'http://localhost:5005/api/v1/tags',
    params );

    return data;
}

export async function updateTag(params: Tags): Promise<Tags> {
  const { id, ...data } = params;
  const { data: response } = await axios.put(
    `http://localhost:5005/api/v1/tags/${id}`,
    data
  );
  return response;
}

export async function deleteTag({ id }: { id: number }): Promise<void> {
  await axios.delete(`http://localhost:5005/api/v1/tags/${id}`);
}