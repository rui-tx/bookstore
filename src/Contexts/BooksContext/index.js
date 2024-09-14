import { createContext } from "react";

const BooksContext = createContext({
  books: [],
  setBooks: () => {},
  loading: true,
  setLoading: () => {},
  reloadTrigger: 0,
  setReloadTrigger: () => {},
});

export default BooksContext;
