import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDescription from "./pages/BookDescription";
import User from "./pages/User";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import MockBooksContext from "./Contexts/MockBooksContext";
import BooksProvider from "./Contexts/BooksProvider";
import AuthProvider from "./Contexts/AuthProvider";
import ToastProvider from "./Contexts/ToastProvider";

function App() {
  const { mockBooks } = useContext(MockBooksContext);

  return (
    <AuthProvider>
      <BooksProvider>
        <MockBooksContext.Provider value={{ mockBooks }}>
          <BrowserRouter>
            <div>
              <ToastProvider>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/book/:id" element={<BookDescription />} />
                  <Route path="/profile" element={<User />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/not-found" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </ToastProvider>
            </div>
          </BrowserRouter>
        </MockBooksContext.Provider>
      </BooksProvider>
    </AuthProvider>
  );
}

export default App;
