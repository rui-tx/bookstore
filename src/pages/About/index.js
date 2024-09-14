import Block from "../../components/Block";
import "./styles.css";

const About = () => {
  return (
    <Block blk="block-embossed">
      <h1 style={{ textAlign: "center" }}>About BookStore</h1>
      <div>
        <p>
          This project is a simple Bookstore app, developed by Rui Texeira and
          hosted on GitHub. The app allows users to browse a variety of books,
          track their reading progress, and manage a collection of books.
        </p>

        <p>
          The Bookstore app is built using React, a powerful front-end library
          for creating user interfaces, and integrates with an external API to
          fetch and manage book data. It also uses Redux for state management,
          ensuring that the app's state is predictable and easy to maintain.
        </p>

        <p>
          The app includes the following key features:
          <ul>
            <li>View a list of available books.</li>
            <li>Add and remove books from your collection.</li>
          </ul>
        </p>

        <p>
          To learn more about this project or contribute, visit the GitHub
          repository:
          <a
            href="https://github.com/rui-tx/bookstore"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub - Bookstore Repository
          </a>
        </p>
      </div>
    </Block>
  );
};

export default About;
