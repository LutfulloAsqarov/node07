import React, { useState, useEffect } from "react";
import user from "../../assets/user.webp";
import {
  useGetProfileQuery,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from "../../context/api/userApi";
import "./profile.scss";
import Modal from "../Modal/Modal";

const initialState = {
  fname: "",
  lname: "",
  username: "",
  age: "",
  budget: "",
  gender: "",
};

const Profile = () => {
  const [formData, setFormData] = useState(initialState);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { data } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  const [profile, setProfile] = useState(false);
  const [password, setPassword] = useState(false);

  useEffect(() => {
    if (data?.payload) {
      setFormData({
        fname: data.payload.fname || "",
        lname: data.payload.lname || "",
        username: data.payload.username || "",
        age: data.payload.age || "",
        budget: data.payload.budget || "",
        gender: data.payload.gender || "",
      });
    }
  }, [data]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    setProfile(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    await updatePassword(passwordData);
    setPassword(false);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <img
            src={user}
            alt={`${data?.payload?.fname} ${data?.payload?.lname}`}
            className="profile-image"
          />
          <h1>{`${data?.payload?.fname} ${data?.payload?.lname}`}</h1>
          <h2>@{data?.payload?.username}</h2>
        </div>
        <div className="profile-details">
          <p>
            <strong>Age:</strong> {data?.payload?.age}
          </p>
          <p>
            <strong>Gender:</strong> {data?.payload?.gender}
          </p>
          <p>
            <strong>Role:</strong> {data?.payload?.role}
          </p>
          <p>
            <strong>Budget:</strong> ${data?.payload?.budget}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {data?.payload?.isActive ? "Active" : "Inactive"}
          </p>
        </div>
        <div className="profile-actions">
          <button onClick={() => setProfile(true)} className="edit-profile-btn">
            Edit Profile
          </button>
          <button
            onClick={() => setPassword(true)}
            className="edit-password-btn"
          >
            Edit Password
          </button>
        </div>
        {profile && (
          <Modal bg={"#aaa8"} width={500} close={setProfile}>
            <form className="profile__edit" onSubmit={handleProfileSubmit}>
              <div className="profile__edit__card">
                <label htmlFor="fname">Fname</label>
                <input
                  id="fname"
                  value={formData.fname}
                  onChange={handleProfileChange}
                  type="text"
                  placeholder="Fname"
                  name="fname"
                />
              </div>
              <div className="profile__edit__card">
                <label htmlFor="lname">Lname</label>
                <input
                  id="lname"
                  value={formData.lname}
                  onChange={handleProfileChange}
                  type="text"
                  placeholder="lname"
                  name="lname"
                />
              </div>
              <div className="profile__edit__card">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  value={formData.username}
                  onChange={handleProfileChange}
                  type="text"
                  name="username"
                />
              </div>
              <div className="profile__edit__card">
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  value={formData.age}
                  onChange={handleProfileChange}
                  type="number"
                  name="age"
                />
              </div>
              <div className="profile__edit__card">
                <label htmlFor="budget">Budget</label>
                <input
                  id="budget"
                  value={formData.budget}
                  onChange={handleProfileChange}
                  type="number"
                  name="budget"
                />
              </div>
              <div className="profile__edit__card">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleProfileChange}
                  name="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <button type="submit">Save</button>
            </form>
          </Modal>
        )}
        {password && (
          <Modal bg={"#aaa8"} width={250} close={setPassword}>
            <form
              className="profile__edit__password"
              onSubmit={handlePasswordSubmit}
            >
              <div className="profile__edit__card">
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  id="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Old Password"
                  name="oldPassword"
                  required
                />
              </div>
              <div className="profile__edit__card">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  required
                />
              </div>
              <button type="submit">Update Password</button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Profile;
