// src/components/Pages/Login/index.js
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./styles.css";

import AuthContext from "../../Contexts/AuthContext";
import ToastContext from "../../Contexts/ToastContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, setUser } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register attempt with:", { email, password });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password,
      name: "Default User",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://5.22.217.225:8081/api/v1/auth/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          if (Array.isArray(data.errors)) {
            data.errors.forEach((error) => {
              addToast(`Registration failed: ${error}`, "toast-error");
              console.error("Registration error: ", error);
            });
            return;
          }
          addToast("Registration failed", "toast-error");
          console.error("Registration error: ", data.errors);
        } else {
          addToast("Registration successful", "toast-success");
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        addToast("An error occurred during registration", "toast-error");
      });
  };

  return (
    <Block blk="block-embossed">
      <div className="register-container">
        <div className="register-column">
          <Block blk="block-embossed">
            <div className="register-logo-container">
              <img
                src="https://openmoji.org/data/color/svg/1F4DA.svg"
                alt="Website Logo"
                className="register-logo"
              />
            </div>
            <h2>BookStore</h2>
            <ul>
              <li>
                Browse our extensive collection of books across various genres.
              </li>
              <li>
                Create your personal reading list and track your reading
                progress.
              </li>
              <li>
                Enjoy personalized book recommendations based on your
                preferences.
              </li>
            </ul>
          </Block>
        </div>

        <div className="register-column">
          <h2>Register New Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
                required
              />
            </div>
            <Button type="submit" btn="success">
              Register
            </Button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </Block>
  );
}

export default Register;
