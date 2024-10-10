import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import Navbar from "../components/CommonComponents/Navbar";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "/api/users/login",
                { email, password }
            );

            if (response.data.message === "Login successful") {
                message.success("Login Successful!");

                // Save user data to local storage
                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(response.data.user)
                );

                if (response.data.user.userType === "Admin") {
                    // Navigate to the admin dashboard
                    navigate("/admin/");
                } else {
                    // Navigate to the home page
                    navigate("/");
                }
            } else {
                message.error("Login Failed. Check your credentials.");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                message.error(error.response.data.message);
            } else {
                message.error("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="sg_main_container_login_page">
                <div className="sg_login_background_main">
                    <div className="sg_login_main_container">
                        <form onSubmit={handleLogin}>
                            <div className="sg_login_title_main_container">
                                <h2 className="sg_logon_title">
                                    Hi, Welcome Back
                                </h2>
                                <p className="sg_login_subtitle">
                                    Enter your credentials to continue
                                </p>
                            </div>
                            <div className="sg_input_filed_main">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="sg_login_email_input"
                                />
                                <div className="">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        className="sg_login_password_input"
                                    />
                                    
                                </div>
                            </div>
                            <div className="sg_login_remember_me">
                                <label>
                                    <input
                                        type="checkbox"
                                        style={{ marginRight: 5 }}
                                    />
                                    Remember me
                                </label>
                                <a
                                    href="/"
                                    className="sg_login_forgot_password"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="sg_login_main_button"
                            >
                                Login
                            </button>
                            <p className="sg_signup_txt_main">
                                Don't have an account?{" "}
                                <a href="/" className="sg_signup_link">
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
