import createAPI from "@/shared/createAPI";
import { omit } from "ramda";

const api = createAPI(import.meta.env.VITE_JSONPLACEHOLDER_TYPICODE_COM);

const omitId = omit(["id"]);

export const getUsersId = (data: Pick<T.User, "id">) =>
  api.getJSON<T.User>(`/users/${data.id}`);

export const getPostsId = (data: Pick<T.Post, "id">) =>
  api.getJSON<T.Post>(`/posts/${data.id}`);

export const getPosts = () => api.getJSON<T.Post[]>(`/posts`);

export const postPosts = (data: Omit<T.Post, "id">) =>
  api.postJSON<T.Post>(`/posts`, data);

export const putPostsId = (data: T.Post) =>
  api.putJSON<T.Post>(`/posts/${data.id}`, omitId(data));

export const patchPostsId = (data: Pick<T.Post, "id"> & Partial<T.Post>) =>
  api.patchJSON<T.Post>(`/posts/${data.id}`, omitId(data));

export const deletePostsId = (data: Pick<T.Post, "id">) =>
  api.deleteJSON(`/posts/${data.id}`);
