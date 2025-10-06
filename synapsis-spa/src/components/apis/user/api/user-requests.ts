import axios from "axios";
import type { User } from "../types/User";

type FetchUsersParams = {
  page?: number;
  size?: number;
  name?: string;
  email?: string;
};

type Meta = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
};

type FetchUsersResult = {
  data: User[];
  meta: Meta;
};

type FetchUserParams = {
  id: number;
};

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

export async function fetchUsers({
  page,
  size,
  name,
}: FetchUsersParams): Promise<FetchUsersResult> {
  const { data } = await apiClient.get("/user", {
    params: {
      page,
      size,
      name,
    },
  });

  return data;
}

export async function getUser({ id }: FetchUserParams): Promise<User> {
  const { data } = await axios.get(`http://localhost:5005/api/v1/user/${id}`);

  return data;
}

export async function createUser(params: User): Promise<User> {
  const { data } = await axios.post(
    "http://localhost:5005/api/v1/register",
    params,
  );

  return data;
}

export async function updateUser(params: User): Promise<User> {
  const { id, ...body } = params;
  const { data } = await apiClient.put(`/user/${id}`, body);
  return data;
}

export async function deleteUser(id: number): Promise<void> {
  await apiClient.delete(`user/${id}`);
}

export async function getUserMe(): Promise<User> {
  const { data } = await apiClient.get("/user/me");

  return data;
}
