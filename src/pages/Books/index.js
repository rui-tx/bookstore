import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Input from "../../components/Input";
import BookList from "../../components/BookList";
import BooksInsert from "../BooksInsert";

import "./styles.css";

//import MockBooksContext from "../../Contexts/MockBooksContext";

import AuthContext from "../../Contexts/AuthContext";
import BooksContext from "../../Contexts/BooksContext";
import ToastContext from "../../Contexts/ToastContext";

const Books = () => {
  //const { mockBooks } = useContext(MockBooksContext);
  const [isInserting, setIsInserting] = useState(false);
  const { isLoggedIn, setLoggedIn, user, setUser, validateToken } =
    useContext(AuthContext);
  const { books, reloadTrigger, setReloadTrigger } = useContext(BooksContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  useEffect(() => {
    // reload books on page load
    const trigger = reloadTrigger + 1;
    setReloadTrigger(trigger);
  }, []);

  const handleInsert = async (newBook) => {
    console.log("Inserting new book:", newBook);

    if (!(await validateToken(user.token))) {
      addToast("Session expired, please login again", "toast-error");
      setLoggedIn(false);
      setUser(null);

      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      navigate("/login", { replace: true });
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title: newBook.title,
      description: newBook.description,
      year: parseInt(newBook.year),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/v1/book/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          if (Array.isArray(data.errors)) {
            data.errors.forEach((error) => {
              addToast(`Insert new book failed: ${error}`, "toast-error");
              console.error("Insert new book error: ", error);
            });
            return;
          }
          addToast("Insert new book error", "toast-error");
          console.error("Insert new book error: ", data.errors);
        } else {
          const trigger = reloadTrigger + 1;
          setReloadTrigger(trigger);
          addToast("New book added successfully 👍", "toast-success");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        addToast("An error occurred inserting new book", "toast-error");
      });

    setIsInserting(false);
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
