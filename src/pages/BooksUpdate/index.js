import { useState } from "react";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./styles.css";

const BooksUpdate = ({ book, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [year, setYear] = useState(book.year);
  const [bookCover, setBookCover] = useState(book.book_cover);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      ...book,
      title,
      description,
      year,
      book_cover: bookCover,
    };
    onUpdate(newBook);
  };

  return (
    <Block blk="block-embossed">
      <div>
        <h2>Updating {title}</h2>
        <div className="book-update">
          <form onSubmit={handleSubmit}>
            <div className="book-update-form-group">
              <label htmlFor="title">Title</label>
              <Input
                type="text"
                id="title"
                value={title}
                placeholder="Title of the book..."
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="book-update-form-group">
              <label htmlFor="author">Description</label>
              <Input
                type="text"
                id="description"
                value={description}
                placeholder="Description of the book..."
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="book-update-form-group">
              <label htmlFor="year">Year</label>
              <Input
                type="number"
                id="year"
                value={year}
                placeholder="Year of the book..."
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div className="book-update-form-group">
              <label htmlFor="book_cover">Book Cover</label>
              <Input
                type="text"
                id="book_cover"
                value={bookCover}
                placeholder="Url for the book cover..."
                onChange={(e) => setBookCover(e.target.value)}
                required
              />
              {bookCover && (
                <Block blk="block-embossed-center">
                  <img
                    style={{ width: "50%" }}
                    src={bookCover}
                    alt="Book Cover"
                  />
                </Block>
              )}
            </div>
            <div className="book-update-button-group">
              <Button btn="success" type="submit">
                Save Changes
              </Button>
              <Button onClick={onCancel}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </Block>
  );
};

export default BooksUpdate;
