import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Modal from "../../Layout/Modal";
import BooksUpdate from "../BooksUpdate";
import "./styles.css";

//import MockBooksContext from "../../Contexts/MockBooksContext";
import AuthContext from "../../Contexts/AuthContext";
import BooksContext from "../../Contexts/BooksContext";
import ToastContext from "../../Contexts/ToastContext";

const BookDescription = () => {
  //const { mockBooks } = useContext(MockBooksContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isViewing, setIsViewing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { isLoggedIn, setLoggedIn, user, setUser, validateToken } =
    useContext(AuthContext);
  const { books, reloadTrigger, setReloadTrigger } = useContext(BooksContext);
  const { addToast } = useContext(ToastContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO change this abomination. it will try to reload the books every time the page loads
    // Maybe save the books in localStorage and reload them on page load.
    if (books === null || books === undefined || books.length === 0) {
      const trigger = reloadTrigger + 1;
      setReloadTrigger(trigger);
      return;
    }
    const foundBook = books.find((b) => b.id === parseInt(id));

    if (!foundBook) {
      navigate("/not-found", { replace: true });
      return;
    }

    if (foundBook.book_cover === undefined || foundBook.book_cover === null) {
      foundBook.book_cover = "https://placehold.co/400x600?text=Not+Available";
    }

    setBook(foundBook || null);
    setLoading(false);
  }, [id, reloadTrigger]);

  if (loading) {
    return (
      <Block>
        <div>Loading...</div>
      </Block>
    );
  }

  if (!book) {
    return (
      <Block>
        <div>Book not found. Please go back and try again.</div>
      </Block>
    );
  }

  const modalImage = (
    <div>
      <img
        height="300"
        src={book.book_cover}
        alt={`Book Cover for '${book.title}'`}
      />
    </div>
  );

  const handleImageModal = () => {
    setIsViewing(!isViewing);
  };

  if (isViewing) {
    return (
      <Modal
        title=""
        content={modalImage}
        open={true}
        onCancel={handleImageModal}
      />
    );
  }

  const handleDelete = async () => {
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

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/v1/book/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          if (Array.isArray(data.errors)) {
            data.errors.forEach((error) => {
              addToast(`Deleting the book failed: ${error}`, "toast-error");
              console.error("Deleting the book error: ", error);
            });
            return;
          }
          addToast("Deleting the book failed", "toast-error");
          console.error("Deleting the book error: ", data.errors);
        } else {
          const trigger = reloadTrigger + 1;
          setReloadTrigger(trigger);
          navigate("/books", { replace: true });
          addToast("Book deleted successfully 👍", "toast-success");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        addToast("An error occurred deleting the book", "toast-error");
      });
  };

  const handleCancel = () => {
    setIsUpdating(false);
  };

  const handleUpdate = async (newBook) => {
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
      book_cover: newBook.book_cover,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/api/v1/book/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          if (Array.isArray(data.errors)) {
            data.errors.forEach((error) => {
              addToast(`Update book failed: ${error}`, "toast-error");
              console.error("Update book error: ", error);
            });
            return;
          }
          addToast("Update book failed", "toast-error");
          console.error("Update book error: ", data.errors);
        } else {
          const trigger = reloadTrigger + 1;
          setReloadTrigger(trigger);
          book.title = newBook.title;
          book.description = newBook.description;
          book.year = newBook.year;
          book.book_cover = newBook.book_cover;

          addToast("Updated book successfully 👍", "toast-success");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        addToast("An error occurred updating the book", "toast-error");
      });

    setIsUpdating(false);
  };

  if (isUpdating) {
    return (
      <BooksUpdate
        book={book}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <Block>
      {isLoggedIn && user.id === book.user.id && (
        <Block blk="block-embossed">
          <Button onClick={() => setIsUpdating(true)}> Update Book </Button>
          <Button btn="cancel" onClick={handleDelete}>
            Delete Book
          </Button>
        </Block>
      )}
      <div className="product-page">
        <div className="product-container">
          <div className="product-image" onClick={() => handleImageModal()}>
            <img src={book.book_cover} alt={`Book Cover for '${book.title}'`} />
          </div>
          <div className="product-info">
            <h1 className="book-title">{book.title}</h1>
            {book.author && <p className="book-author">by {book.author}</p>}
            {book.year && (
              <p className="book-year">
                <strong>{book.year} </strong>
              </p>
            )}
            {book.rating && <p className="book-rating">{book.rating} stars</p>}
            {book.price && (
              <p className="book-price">
                <strong>${book.price}</strong>
              </p>
            )}
            <p className="book-description">{book.description}</p>
            <p className="book-description">
              Book inserted by <strong>{book.user.name}</strong>
            </p>
            <div className="action-buttons">
              <button className="add-to-cart">Add to Cart</button>
              <button className="buy-now">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </Block>
  );
};

export default BookDescription;
