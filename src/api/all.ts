import createAPI from "@/shared/createAPI";

const api = createAPI(import.meta.env.VITE_JSONPLACEHOLDER_TYPICODE_COM);

export const getPosts = () => api.getJSON<D.Post[]>("/posts");

export const getComments = () => api.getJSON<D.Comment[]>("/comments");

export const getAlbums = () => api.getJSON<D.Album[]>("/albums");

export const getPhotos = () => api.getJSON<D.Photo[]>("/photos");

export const getTodos = () => api.getJSON<D.Todo[]>("/todos");

export const getUsers = () => api.getJSON<D.User[]>("/users");
