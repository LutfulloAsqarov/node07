import React, { useEffect, useState } from "react";
import { useSignUpUserMutation } from "../../context/api/userApi";
import "./register.scss";
import { NavLink, useNavigate } from "react-router-dom";

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

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [handleCreate, { data, isSuccess, isError }] =
        useSignUpUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleCreate(formData);
        console.log(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            setFormData(initialState);
            navigate("/login");
        } else if (isError) {
            alert(data?.msg);
        }
    }, [isSuccess, isError, data]);

    return (
        <div className="register">
            <h2 className="register__title">Register</h2>
            <form className="register__form" onSubmit={handleSubmit}>
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
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
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
                <div className="register__link">
                    <p>Have you account?</p>
                    <NavLink to="/login">Login</NavLink>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
