import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Block from "../../components/Block";
import Modal from "../../Layout/Modal";
import "./styles.css";

//import MockBooksContext from "../../Contexts/MockBooksContext";
import BooksContext from "../../Contexts/BooksContext";

const BookDescription = () => {
  //const { mockBooks } = useContext(MockBooksContext);
  const { books } = useContext(BooksContext);
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    const foundBook = books.find((b) => b.id === parseInt(id));

    if (foundBook.book_cover === undefined || foundBook.book_cover === null) {
      foundBook.book_cover = "https://placehold.co/400x600?text=Not+Available";
    }

    setBook(foundBook || null);
    setLoading(false);
  }, [id]);

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
        <div>Book not found</div>
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

  return (
    <Block>
      <div className="product-page">
        <div className="product-container">
          <div className="product-image" onClick={() => handleImageModal()}>
            <img src={book.book_cover} alt={`Book Cover for '${book.title}'`} />
          </div>
          <div className="product-info">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">by {book.author}</p>
            <p className="book-rating">⭐⭐⭐⭐☆ (134 reviews)</p>
            <p className="book-price">$19.99</p>
            <p className="book-description">{book.description}</p>
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
