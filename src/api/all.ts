import createAPI from "@/shared/createAPI";

const api = createAPI(import.meta.env.VITE_JSONPLACEHOLDER_TYPICODE_COM);

export const getUser = (data: { id: number }) =>
  api.getJSON<D.User>(`/users/${data.id}`);
