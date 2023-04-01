import createAPI from "@/shared/createAPI";
import { omit } from "ramda";

const api = createAPI(import.meta.env.VITE_JSONPLACEHOLDER_TYPICODE_COM);

const omitId = omit(["id"]);

export const getUsersId = (data: Pick<API.User, "id">) =>
  api.getJSON<API.User>(`/users/${data.id}`);

export const getPostsId = (data: Pick<API.Post, "id">) =>
  api.getJSON<API.Post>(`/posts/${data.id}`);

export const getPosts = () => api.getJSON<API.Post[]>(`/posts`);

export const postPosts = (data: Omit<API.Post, "id">) =>
  api.postJSON<API.Post>(`/posts`, data);

export const putPostsId = (data: API.Post) =>
  api.putJSON<API.Post>(`/posts/${data.id}`, omitId(data));

export const patchPostsId = (data: Pick<API.Post, "id"> & Partial<API.Post>) =>
  api.patchJSON<API.Post>(`/posts/${data.id}`, omitId(data));

export const deletePostsId = (data: Pick<API.Post, "id">) =>
  api.deleteJSON(`/posts/${data.id}`);
