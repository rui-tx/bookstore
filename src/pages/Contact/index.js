import Block from "../../components/Block";
import "./styles.css";

const Contact = () => {
  return (
    <Block blk="block-embossed">
      <h1 style={{ textAlign: "center" }}>Contact Us</h1>
      <p>
        If you have any questions or inquiries about the Bookstore app, feel
        free to reach out to us.
      </p>

      <p>
        You can contact the developer, Rui Texeira, via the following methods:
      </p>

      <ul>
        <li>
          Email: <a href="mailto:ruitx@example.com">ruitx@example.com</a>
        </li>
        <li>
          GitHub:{" "}
          <a
            href="https://github.com/rui-tx"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/rui-tx
          </a>
        </li>
      </ul>

      <p>
        We aim to respond to all inquiries within 2-3 business
        days/months/years.
      </p>
    </Block>
  );
};

export default Contact;
