import { useContext } from "react";
import { Link } from "react-router-dom";
import Block from "../../components/Block";
import "./styles.css";

import AuthContext from "../../Contexts/AuthContext";

function Header() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <Block blk="block-embossed">
      <header className="topbar">
        <div className="logo">
          <Link to="/" className="no-link">
            📚 BookStore
          </Link>
        </div>
        <nav className="nav-links">
          {isLoggedIn && <Link to="/user">User</Link>}
          <Link to="/books">Books</Link>
          {isLoggedIn ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>
    </Block>
  );
}

export default Header;
