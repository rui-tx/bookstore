import React, { useState, useContext } from "react";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Input from "../../components/Input";
import BookList from "../../components/BookList";
import BooksInsert from "../BooksInsert";

import "./styles.css";

//import MockBooksContext from "../../Contexts/MockBooksContext";
import BooksContext from "../../Contexts/BooksContext";
import AuthContext from "../../Contexts/AuthContext";

const Books = () => {
  //const { mockBooks } = useContext(MockBooksContext);
  const { books } = useContext(BooksContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [isInserting, setIsInserting] = useState(false);

  const handleInsert = (newBook) => {
    console.log("Inserting new book:", newBook);
    setIsInserting(false);
    const newId = books.length + 1;
    newBook.id = newId;
    books.push(newBook);
  };

  const handleCancel = () => {
    setIsInserting(false);
  };

  if (isInserting) {
    return <BooksInsert onInsert={handleInsert} onCancel={handleCancel} />;
  }

  return (
    <div>
      <Block blk="block-embossed">
        <div className="group">
          {isLoggedIn && (
            <Button onClick={() => setIsInserting(true)}>
              Insert New Book
            </Button>
          )}
          <div className="group">
            <Input
              type="text"
              id="bookSearch"
              name="bookSearch"
              placeholder="Search books..."
            />
            <Button onclick="searchBooks()">Search</Button>
          </div>
        </div>
      </Block>
      <BookList books={books} columns={3} />
    </div>
  );
};

export default Books;
