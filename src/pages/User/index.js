import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../components/Block";
import Button from "../../components/Button";
import UserEdit from "../UserEdit";
import "./styles.css";

import AuthContext from "../../Contexts/AuthContext";
import ToastContext from "../../Contexts/ToastContext";

const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { isLoggedIn, user, setUser } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleSave = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
    addToast("Profile updated successfully", "toast-success");
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
    console.log("Editing user profile:", user);
    return <UserEdit user={user} onSave={handleSave} onCancel={handleCancel} />;
  }

  //console.log("User profile:", user);

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
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p></p>
            <p></p>
            <div>
              <strong>Favorite Genres:</strong>
            </div>
          </div>
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
      </div>
    </Block>
  );
};

export default User;
