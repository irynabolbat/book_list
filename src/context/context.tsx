import React, { createContext, useState, useMemo } from "react";
import { Book } from "../types/BookType";
import { Author } from "../types/AuthorType";
import { Category } from "../types/CategoryType";

type AppContextProps = {
  books: Book[],
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>,
  authors: Author[],
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>,
  categories: Category[],
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
  selectedBookId: number | null;
  setSelectedBookId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const AppContext = createContext<AppContextProps>({
  books: [],
  setBooks: () => {},
  authors: [],
  setAuthors: () => {},
  categories: [],
  setCategories: () => {},
  selectedBookId: null,
  setSelectedBookId: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const value = useMemo(() => ({
    books,
    setBooks,
    authors, 
    setAuthors,
    categories, 
    setCategories,
    selectedBookId,
    setSelectedBookId,
  }), [books, authors, categories, selectedBookId]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
