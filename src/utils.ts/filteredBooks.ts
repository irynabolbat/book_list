import { Book } from "../types/BookType";
import { Status } from "../types/StatusEnum";

export function filteredBooks(books: Book[], filter: string) {
  let visibleBooks = [...books];

  if (filter !== Status.All) {
    visibleBooks = visibleBooks.filter(book => book.status === filter);
  }

  return visibleBooks;
}