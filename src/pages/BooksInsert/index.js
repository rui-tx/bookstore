import { useState } from "react";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import "./styles.css";

const BooksInsert = ({ onInsert, onCancel }) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [year, setYear] = useState(null);
  const [bookCover, setBookCover] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      description,
      year,
      book_cover: bookCover,
    };
    onInsert(newBook);
  };

  return (
    <Block blk="block-embossed">
      <div>
        <h2>Insert New Book</h2>
        <div className="book-insert">
          <form onSubmit={handleSubmit}>
            <div className="book-insert-form-group">
              <label htmlFor="title">Title</label>
              <Input
                type="text"
                id="title"
                placeholder="Title of the book..."
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="book-insert-form-group">
              <label htmlFor="author">Description</label>
              <Textarea
                type="text"
                id="description"
                placeholder="Description of the book..."
                onChange={(e) => setDescription(e.target.value)}
                rows="20"
                required
              />
            </div>
            <div className="book-insert-form-group">
              <label htmlFor="year">Year</label>
              <Input
                type="number"
                id="year"
                placeholder="Year of the book..."
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div className="book-insert-form-group">
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
            <div className="book-insert-button-group">
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

export default BooksInsert;
