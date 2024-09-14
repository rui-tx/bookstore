import { useState } from "react";
import { Link } from "react-router-dom";

import Block from "../Block";
import Button from "../Button";
import Modal from "../../Layout/Modal";
import "./styles.css";

const Book = ({ id, title, author, year, coverUrl }) => {
  const [isViewing, setIsViewing] = useState(false);

  if (coverUrl === undefined || coverUrl === null) {
    coverUrl = "https://placehold.co/400x600?text=Not+Available";
  }

  const modalContent = (
    <div>
      <p>Author: {author}</p>
      <p>Year: {year}</p>
    </div>
  );

  const modalImage = (
    <div>
      <img height="300" src={coverUrl} alt={`Book Cover for '${title}'`} />
      <p>Author: {author}</p>
      <p>Year: {year}</p>
    </div>
  );

  const contextButton = (
    <Button btn="success">
      <Link className="button-link" to={`/book/${id}`}>
        Book Page
      </Link>
    </Button>
  );

  const handleImageModal = () => {
    setIsViewing(!isViewing);
  };

  if (isViewing) {
    return (
      <Modal
        title={title}
        content={modalImage}
        open={true}
        onCancel={handleImageModal}
        contextButton={contextButton}
      />
    );
  }

  return (
    <Block blk="block-embossed">
      <div className="book">
        <div
          className="book-image"
          onClick={() => handleImageModal()}
          style={{ backgroundImage: `url(${coverUrl})` }}
          alt={`Book Cover for '${title}'`}
        ></div>
        <div className="book-content book-link">
          <Link className="book-link" to={`/book/${id}`}>
            <h3>{title}</h3>
            <p>{author}</p>
            <p>{year}</p>
          </Link>
        </div>
      </div>
    </Block>
  );
};

export default Book;
