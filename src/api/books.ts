import { Book } from "../types/BookType";
import { client } from "../utils.ts/fetchClient";

export const getBooks = () => {
  return client.get<Book[]>('/books');
};

export const createBook = ({ 
  id, title, authorId, categoryId, isbn, createdAt, modifiedAt, status 
}: Book) => {
  return client.post<Book>('/books', { 
    id, title, authorId, categoryId, isbn, createdAt, modifiedAt, status, 
  });
};

export const deleteBook = (bookId: number) => {
  return client.delete(`/books/${bookId}`);
};

export const updateBook = ({
  id, title, authorId, categoryId, isbn, createdAt, modifiedAt, status, 
}: Book) => {
  return client.patch<Book>(`/books/${id}`, {
    id, title, authorId, categoryId, isbn, createdAt, modifiedAt, status, 
  });
};