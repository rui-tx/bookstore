import React, { useState } from "react";
import Block from "../../components/Block";
import Button from "../../components/Button";
import Input from "../../components/Input";
import "./styles.css";

const UserEdit = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profile_picture);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name,
      email,
      profile_picture: profilePicture,
    };
    onSave(updatedUser);
  };

  return (
    <Block blk="block-embossed">
      <div className="user-edit">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile_picture">Profile Picture URL</label>
            <Input
              type="text"
              id="profile_picture"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              required
            />
            {profilePicture && (
              <Block blk="block-embossed-center">
                <img
                  style={{ width: "50%" }}
                  src={profilePicture}
                  alt="Preview of the profile picture"
                />
              </Block>
            )}
          </div>

          <div className="button-group">
            <Button btn="success" type="submit">
              Save Changes
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </div>
    </Block>
  );
};

export default UserEdit;
