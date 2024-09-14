import { createContext } from "react";

const BooksContext = createContext({
  books: [],
  setBooks: () => {},
  loading: true,
  setLoading: () => {},
});

export default BooksContext;
