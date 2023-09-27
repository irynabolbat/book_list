import { Category } from "../types/CategoryType";
import { client } from "../utils.ts/fetchClient";

export const getCategories = () => {
  return client.get<Category[]>('/categories');
};

export const createCategory = ({ id, name }: Category) => {
  return client.post<Category>('/categories', { id, name });
};