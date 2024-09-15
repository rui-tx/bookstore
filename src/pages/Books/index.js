import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import BookList from "../../components/BookList";
import BooksInsert from "../BooksInsert";

import "./styles.css";

//import MockBooksContext from "../../Contexts/MockBooksContext";

import AuthContext from "../../Contexts/AuthContext";
import BooksContext from "../../Contexts/BooksContext";
import ToastContext from "../../Contexts/ToastContext";

const Books = () => {
  //const { mockBooks } = useContext(MockBooksContext);
  const [isInserting, setIsInserting] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoggedIn, setLoggedIn, user, setUser, validateToken } =
    useContext(AuthContext);
  const { books, reloadTrigger, setReloadTrigger } = useContext(BooksContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  useEffect(() => {
    // reload books on page load
    const trigger = reloadTrigger + 1;
    setReloadTrigger(trigger);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInsert = async (newBook) => {
    console.log("Inserting new book:", newBook);

    if (!(await validateToken(user.token))) {
      addToast("Session expired, please login again", "toast-error");
      setLoggedIn(false);
      setUser(null);

      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      navigate("/login", { replace: true });
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", user.token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      title: newBook.title,
      description: newBook.description,
      year: parseInt(newBook.year),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/v1/book/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          if (Array.isArray(data.errors)) {
            data.errors.forEach((error) => {
              addToast(`Insert new book failed: ${error}`, "toast-error");
              console.error("Insert new book error: ", error);
            });
            return;
          }
          addToast("Insert new book error", "toast-error");
          console.error("Insert new book error: ", data.errors);
        } else {
          const trigger = reloadTrigger + 1;
          setReloadTrigger(trigger);
          addToast("New book added successfully 👍", "toast-success");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        addToast("An error occurred inserting new book", "toast-error");
      });

    setIsInserting(false);
  };

  const handleCancel = () => {
    setIsInserting(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.length === 0) {
      setSearchList([]);
      return;
    }
    setSearchList(
      books.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    console.log("Search term:", searchTerm);
  };

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm.length === 0) {
      setSearchList([]);
    } else {
      let results = [];

      // search by id first
      results = books.filter((b) => b.id === parseInt(newSearchTerm));
      if (results.length > 0) {
        setSearchList(results);
        return;
      }
      // search by title
      results = books.filter((b) =>
        b.title.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      if (results.length > 0) {
        setSearchList(results);
        return;
      }

      // search by year
      results = books.filter((b) => b.year === parseInt(newSearchTerm));
      if (results.length > 0) {
        setSearchList(results);
        return;
      }
    }
  };

  const handleSort = (e) => {
    const newBooks = books.sort((a, b) => {
      if (e.target.value === "yearSort") {
        return a.year - b.year;
      }
      if (e.target.value === "titleSort") {
        return a.title.localeCompare(b.title);
      }
    });

    setSearchList(newBooks);

    console.log("Sorting by:", e.target.value);
    addToast("Sorting by: " + e.target.value, "toast-success");
  };

  const handleOrder = (e) => {
    const newBooks = books.sort((a, b) => {
      if (e.target.value === "Ascending") {
        return a.year - b.year;
      }
      if (e.target.value === "Descending") {
        return b.year - a.year;
      }
    });

    setSearchList(newBooks);

    console.log("Ordering by:", e.target.value);
    addToast("Ordering by: " + e.target.value, "toast-success");
  };

  const handleFilterByYear = (e) => {
    const newBooks = books.filter((b) => b.year === parseInt(e.target.value));

    setSearchList(newBooks);

    //console.log("Filter by year:", newBooks);
    addToast("Filter by year: " + e.target.value, "toast-success");
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSearchList([]);
    addToast("Cleared filters", "toast-success");
  };

  if (isInserting) {
    return <BooksInsert onInsert={handleInsert} onCancel={handleCancel} />;
  }

  //<Button onClick={handleSearch}>Search</Button>
  return (
    <div className={`books-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      {sidebarOpen && (
        <Block blk="block-embossed">
          <Button
            btn="success"
            className="sidebar-toggle"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? "Close Filters" : "Filter Books"}
          </Button>
          <div className="sidebar">
            <h3>Filters</h3>
            <Button btn="cancel" onClick={handleClearFilters}>
              Clear Filters
            </Button>

            <div className="filter-group">
              <label htmlFor="yearFilter">Filter by Year</label>
              <Input
                type="number"
                id="yearFilter"
                name="yearFilter"
                placeholder="Filter by year..."
                onChange={handleFilterByYear}
              />
            </div>

            <div className="filter-group">
              <span>Sort by</span>
              <Select name="sortList" id="sortList" onChange={handleSort}>
                <option value="yearSort">Year</option>
                <option value="titleSort">Title</option>
              </Select>
            </div>

            <div className="filter-group">
              <span>Order by</span>
              <Select name="orderList" id="orderList" onChange={handleOrder}>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </Select>
            </div>
          </div>
        </Block>
      )}

      <div className="main-content">
        <Block blk="block-embossed">
          <h2>Books Listing</h2>
          {!sidebarOpen && (
            <Button
              btn="success"
              className="sidebar-toggle"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? "Close Filters" : "Filter Books"}
            </Button>
          )}
          <div className="group">
            <div className="group"></div>
            {isLoggedIn && (
              <Button onClick={() => setIsInserting(true)}>
                Insert New Book
              </Button>
            )}
            <div className="group">
              <Input
                type="text"
                id="bookSearch"
                name="bookSearch"
                placeholder="Search Book..."
                value={searchTerm}
                onChange={handleInputChange}
              />
              {searchTerm.length > 0 && (
                <Button
                  btn="success"
                  onClick={() => {
                    setSearchTerm("");
                    setSearchList([]);
                  }}
                >
                  Clear Search
                </Button>
              )}
            </div>
            {searchList.length > 0 ? (
              <div className="group">
                <span>Results: {searchList.length} </span>
              </div>
            ) : (
              searchTerm.length > 0 && (
                <div className="group">
                  <span>No results found.</span>
                </div>
              )
            )}
          </div>
        </Block>

        {searchTerm.length > 0 ? (
          searchList.length > 0 ? (
            <Block blk="block-embossed">
              <h2>Search results</h2>
              <BookList books={searchList} columns={3} />
            </Block>
          ) : (
            <div>
              <Block blk="block-embossed-center">
                <span>No results found.</span>
              </Block>
            </div>
          )
        ) : (
          <BookList books={books} columns={3} />
        )}
      </div>
    </div>
  );
};

export default Books;
