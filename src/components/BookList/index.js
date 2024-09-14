// src/components/BookList/index.js
import Book from "../Book";
import "./styles.css";

const BookList = ({ books, columns }) => {
  if (columns === 3) {
    return (
      <div className="book-list three-columns">
        {books.map((book) => (
          <Book
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            year={book.year}
            coverUrl={book.book_cover}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <Book
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          year={book.year}
          coverUrl={book.url}
        />
      ))}
    </div>
  );
};

export default BookList;
