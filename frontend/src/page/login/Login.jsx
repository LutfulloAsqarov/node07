import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../context/slices/authSlice";
import { useSingInUserMutation } from "../../context/api/userApi";
import "./login.scss";

const initialState = {
    username: "",
    password: "",
};

const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const [signIn, { data, isError, isSuccess }] = useSingInUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(data);

    useEffect(() => {
        if (isSuccess && data) {
            const token = data.payload;
            dispatch(setToken(token));

            navigate("/home");
        }
    }, [isSuccess, data, dispatch, navigate]);

    useEffect(() => {
        if (isError) {
            alert("Username or Password is wrong");
        }
    }, [isError]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(formData);
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="login__form">
                <h3>Login</h3>
                <label htmlFor="username">
                    <span>Username</span>
                    <input
                        type="text"
                        value={formData.username}
                        name="username"
                        onChange={handleChange}
                        placeholder="Enter Username"
                    />
                </label>
                <label htmlFor="password">
                    <span>Password</span>
                    <input
                        type="password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                        placeholder="Enter Password"
                    />
                </label>
                <button type="submit">Login</button>
                <div className="bot">
                    <p>Have not account?</p>
                    <NavLink to="/register">Register</NavLink>
                </div>
            </form>
        </div>
    );
};

export default Login;
