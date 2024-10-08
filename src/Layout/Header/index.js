import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Block from "../../components/Block";
import "./styles.css";

import AuthContext from "../../Contexts/AuthContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user } = useContext(AuthContext);
  const location = useLocation();
  const { hash, pathname, search } = location;

  const isActive = (path) => pathname === path;

  // this adds the effect to the top element of the current component
  useEffect(() => {
    return menuOpen
      ? document.querySelector("body").classList.add("menu-open")
      : document.querySelector("body").classList.remove("menu-open");
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter((x) => x);
    let breadcrumbs = [{ path: "/", label: "Home" }];

    paths.forEach((path, index) => {
      breadcrumbs.push({
        path: "/" + paths.slice(0, index + 1).join("/"),
        label: path.charAt(0).toUpperCase() + path.slice(1),
      });
    });

    return breadcrumbs;
  };

  return (
    <Block blk={`block-embossed ${menuOpen ? "menu-open" : ""}`}>
      <div className="menu-overlay"></div>

      <header className="topbar">
        <div className="logo">
          <Link to="/" className="no-link" onClick={closeMenu}>
            📚 BookStore
          </Link>
        </div>
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link
            to="/books"
            onClick={closeMenu}
            className={isActive("/books") ? "active" : ""}
          >
            Books
          </Link>

          {isLoggedIn ? (
            <Link
              to="/logout"
              onClick={closeMenu}
              className={isActive("/logout") ? "active" : ""}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className={isActive("/login") ? "active" : ""}
            >
              Login
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/profile"
              onClick={closeMenu}
              className={`no-border profile-link ${
                isActive("/profile") ? "active" : ""
              }`}
            >
              {user.profile_picture && (
                <img
                  src={user.profile_picture}
                  alt="Profile"
                  className="profile-picture"
                />
              )}
              {user.name}
            </Link>
          )}
        </nav>
      </header>
      <div className="breadcrumbs">
        {getBreadcrumbs().map((crumb, index, array) => (
          <span key={crumb.path}>
            <Link to={crumb.path}>{crumb.label}</Link>
            {index < array.length - 1 && " > "}
          </span>
        ))}
      </div>
    </Block>
  );
}

export default Header;
