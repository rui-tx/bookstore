import Block from "../../components/Block";
import "./styles.css";

const Footer = ({ stickyFooter = false }) => {
  return (
    <Block blk="block-embossed">
      <footer className={`footer ${stickyFooter ? "sticky-footer" : ""}`}>
        <div className="footer-logo">
          <a href="/" className="no-link">
            📚
          </a>
        </div>
        <nav className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
        </nav>
        <div className="copyright">© {new Date().getFullYear()}</div>
      </footer>
    </Block>
  );
};

export default Footer;
