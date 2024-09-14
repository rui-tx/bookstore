import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Block from "../../Block";
import Button from "../../Button";
import UserEdit from "../UserEdit";
import "./styles.css";

import AuthContext from "../../../components/AppContexts/AuthContext";

const User = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // const [user, setUser] = useState({
  //   name: "Jane Doe",
  //   email: "jane.doe@example.com",
  //   joinDate: "January 1, 2023",
  //   favoriteGenres: ["Science Fiction", "Mystery", "Biography"],
  //   booksRead: 42,
  //   avatar: "https://i.pravatar.cc/150",
  // });

  const handleSave = (updatedUser) => {
    //setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, []);

  if (isEditing) {
    console.log("Editing user profile:", user);
    return <UserEdit user={user} onSave={handleSave} onCancel={handleCancel} />;
  }

  return (
    <Block>
      <div className="user-profile">
        <h2>User Profile</h2>
        <div className="profile-content">
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <div className="user-info">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Member Since:</strong> {user.joinDate}
            </p>
            <p>
              <strong>Books Read:</strong> {user.booksRead}
            </p>
            <div>
              <strong>Favorite Genres:</strong>
              <ul>
                {user.favoriteGenres.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
      </div>
    </Block>
  );
};

export default User;
