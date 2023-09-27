import { Author } from "../types/AuthorType";
import { client } from "../utils.ts/fetchClient";

export const getAuthors = () => {
  return client.get<Author[]>('/authors');
};

export const createAuthor = ({ id, name }: Author) => {
  return client.post<Author>('/authors', { id, name });
};