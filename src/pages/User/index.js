import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import BookList from "../../components/BookList";
import UserEdit from "../UserEdit";
import "./styles.css";

import AuthContext from "../../Contexts/AuthContext";
import BooksContext from "../../Contexts/BooksContext";
import ToastContext from "../../Contexts/ToastContext";

const User = () => {
  const [userBooks, setUserBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { isLoggedIn, setLoggedIn, user, setUser, validateToken } =
    useContext(AuthContext);
  const { books } = useContext(BooksContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userBooks = books.filter((b) => b.user.id === user.id);
    setUserBooks(userBooks);
  }, []);

  const handleSave = async (updatedUser) => {
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
      email: updatedUser.email,
      name: updatedUser.name,
      profile_picture: updatedUser.profile_picture,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/v1/user/profile", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (!data.status) {
          if (Array.isArray(data.errors)) {
            data.errors.forEach((error) => {
              addToast(`Update user profile failed: ${error}`, "toast-error");
              console.error("Update user profile error: ", error);
            });
            return;
          }
          addToast("Update user profile failed", "toast-error");
          console.error("Update user profile error: ", data.errors);
        } else {
          // update the user with new data from the API
          // reuses the same token

          setUser({
            id: data.data.id,
            name: data.data.name,
            email: data.data.email,
            profile_picture: data.data.profile_picture,
            token: user.token,
          });

          localStorage.setItem("user", JSON.stringify(data.data));

          addToast("Updated user profile successfully 👍", "toast-success");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        addToast("An error occurred during user profile update", "toast-error");
      });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
      addToast("Login to access user profile", "toast-error");
    }
  }, [isLoggedIn]);

  if (!user || Object.keys(user).length === 0) {
    console.log("No user data available");
    return <div>Loading user data...</div>;
  }

  if (isEditing) {
    //console.log("Editing user profile:", user);
    return <UserEdit user={user} onSave={handleSave} onCancel={handleCancel} />;
  }

  return (
    <Block blk="block-embossed">
      <div className="user-profile">
        <h2>User Profile</h2>
        <div className="profile-content">
          <img
            src={user.profile_picture}
            alt={user.name}
            className="user-avatar"
          />
          <div className="user-info">
            <p>
              <strong>Id:</strong> {user.id}
            </p>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p></p>
          </div>
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
      </div>
      <Block blk="block-embossed">
        <div className="user-books">
          <h2>Your Books</h2>
          {userBooks.length === 0 && (
            <p>You haven't added any books yet. Go and add some! 🙂</p>
          )}
          <BookList books={userBooks} columns={3} />
        </div>
      </Block>
    </Block>
  );
};

export default User;
