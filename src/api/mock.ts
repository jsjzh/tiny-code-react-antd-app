import createAPI from "@/shared/createAPI";

const api = createAPI(import.meta.env.VITE_MOCK_HOST);

export const fetchData = async (data: { query: string }) =>
  api.getJSON(`/api/v1/search`, data);
