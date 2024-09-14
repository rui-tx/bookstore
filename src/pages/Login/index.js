import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./styles.css";

import AuthContext from "../../Contexts/AuthContext";
import ToastContext from "../../Contexts/ToastContext";
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, setLoggedIn, setUser } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  // redirect to user page if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile", { replace: true });
    }
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://5.22.217.225:8081/api/v1/auth/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        if (!data.status) {
          addToast("Login failed!", "toast-error");
          console.error("Login failed: ", data);
          return;
        }

        setLoggedIn(true);
        setUser({
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          profile_picture: data.data.profile_picture,
          token: data.data.token,
        });

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", JSON.stringify(data.data));

        addToast(
          "You are logged in! Hi " + data.data.name + "👋",
          "toast-success"
        );
      })
      .catch((error) => {
        addToast("Login failed: " + error, "toast-error");
        console.error(error);
      });
  };

  return (
    <Block blk="block-embossed">
      <div className="login">
        <h2>Login</h2>
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
          <Button btn="success" type="submit">
            Login
          </Button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>{" "}
        </p>
      </div>
    </Block>
  );
}

export default Login;
