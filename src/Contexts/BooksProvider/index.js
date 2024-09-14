import { useState, useEffect } from "react";

import BooksContext from "../BooksContext";

const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("http://5.22.217.225:8081/api/v1/book/", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const data = JSON.parse(result);
          if (!data.status) {
            console.error("Fetch books failed: ", data);
            return;
          }
          setBooks(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    };

    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, loading }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;
