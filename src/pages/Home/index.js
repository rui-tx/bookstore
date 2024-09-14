import { useContext, useEffect } from "react";
import Block from "../../components/Block";
import BookList from "../../components/BookList";
import "./styles.css";

//import MockBooksContext from "../../Contexts/MockBooksContext";
import BooksContext from "../../Contexts/BooksContext";

const Home = () => {
  //const { mockBooks } = useContext(MockBooksContext);
  const { books, loading } = useContext(BooksContext);

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div>
      <Block blk="block-embossed">
        <h2 style={{ textAlign: "center" }}>Welcome to BookStore!</h2>
      </Block>

      <Block blk="block-embossed">
        <h3>New books, just for you! </h3>
        <BookList books={books} columns={3} />
      </Block>
    </div>
  );
};

export default Home;
