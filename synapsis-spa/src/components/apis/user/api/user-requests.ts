import axios from "axios";
import type { User } from "../types/User";

type FetchUsersParams = {
  page?: number;
  size?: number;
  name?: string;
  email?: string;
};

type FetchUsersResult = {
  data: User[];
};

type FetchUserParams = {
  id: number;
};

export async function fetchUsers({
  page,
  size,
  name,
  email,
}: FetchUsersParams): Promise<FetchUsersResult> {
  const { data } = await axios.get(`http://localhost:5005/api/v1/user`, {
    params: {
      page,
      size,
      name,
      email,
    },
  });

  return data;
}

export async function getUser({ id }: FetchUserParams): Promise<User> {
  const { data } = await axios.get(
    `http://localhost:5005/api/v1/user/${id}`
  );

  return data;
}

export async function createUser(params: User): Promise<User> {
    const { data } = await axios.post(
    'http://localhost:5005/api/v1/register',
    params );

    return data;
}

export async function updateUser(params: User): Promise<User> {
  const { id, ...data } = params;
  const { data: response } = await axios.put(
    `http://localhost:5005/api/v1/user/${id}`,
    data
  );
  return response;
}

export async function deleteUser({ id }: { id: number }): Promise<void> {
  await axios.delete(`http://localhost:5005/api/v1/${id}`);
}