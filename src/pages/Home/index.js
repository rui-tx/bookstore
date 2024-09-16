import { useContext } from "react";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Input from "../../components/Input";
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
        <BookList
          books={books.sort((a, b) => b.id - a.id).slice(0, 6)}
          columns={3}
        />
      </Block>

      <Block blk="block-center">
        <h2 style={{ textAlign: "center" }}>
          Never miss a new release again. Subscribe to our newsletter to stay up
          to date!
        </h2>
      </Block>
      <Block blk="block-center">
        <Input type="email" placeholder="Enter your email..." />
        <Button btn="success">Subscribe</Button>
      </Block>

      <Block blk="block-embossed">
        <h3>2000s is the new twenties!</h3>
        <BookList
          books={books.filter((b) => b.year >= 2000 && b.year <= 2010)}
          columns={3}
        />
      </Block>

      <Block blk="block-embossed">
        <h3>Fresh classics? We got you covered!</h3>
        <BookList
          books={books
            .filter((b) => b.year <= 1970)
            .sort((a, b) => b.id - a.id)
            .slice(0, 6)}
          columns={3}
        />
      </Block>
    </div>
  );
};

export default Home;
