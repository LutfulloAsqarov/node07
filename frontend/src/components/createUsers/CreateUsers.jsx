import React, { useEffect, useState } from "react";
import { useSignUpUserMutation } from "../../context/api/userApi";
import "./createUser.scss";

const initialState = {
  fname: "",
  lname: "",
  username: "",
  password: "",
  age: "",
  url: "",
  gender: "male",
  isActive: "true",
  budget: "",
};

const CreateUsers = () => {
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [handleCreate, { data, isSuccess, isError }] = useSignUpUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreate(formData);
    console.log(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      alert(data?.msg);
      setFormData(initialState);
    } else if (isError) {
      alert(data?.msg);
    }
  }, [isSuccess, isError, data]);

  return (
    <div className="create">
      <h2 className="create__title">Create User</h2>
      <form className="create__form" onSubmit={handleSubmit}>
        <label>
          <span>First Name</span>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="First Name"
          />
        </label>
        <label>
          <span>Last Name</span>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </label>
        <label>
          <span>Username</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </label>
        <label>
          <span>Age</span>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
          />
        </label>
        <label>
          <span>Profile URL</span>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Profile URL"
          />
        </label>
        <label>
          <span>Gender</span>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          <span>Budget</span>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Budget"
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateUsers;
