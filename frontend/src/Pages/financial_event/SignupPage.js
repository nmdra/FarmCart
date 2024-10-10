import React, { useState } from "react";
import Navbar from '../components/CommonComponents/Navbar';
import axios from 'axios'; // Import Axios
import { message } from 'antd'; // Import Ant Design message
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        const { firstName, lastName, email, username, password, confirmPassword, agreeToTerms } = formData;

        // Check if all required fields are filled
        if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
            message.error('Please fill in all required fields.');
            return false;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            message.error('Passwords do not match.');
            return false;
        }

        // Check if terms and conditions are agreed to
        if (!agreeToTerms) {
            message.error('You must agree to the terms and conditions.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform front-end validation
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('/api/users/signup', formData);

            if (response.status === 201) {
                message.success(response.data.message);

                // Save the user object to local storage
                localStorage.setItem('currentUser', JSON.stringify(response.data.user));

                // Redirect to the home page
                navigate('/');

                // Optionally reset the form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    agreeToTerms: false,
                });
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                message.error(error.response.data.message);
            } else {
                message.error('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="sg_signup_page_main_container">
                <div className="sg_signup_page_form_container">
                    <h2 className="sg_signup_page_title">Sign up</h2>
                    <p className="sg_signup_page_subtitle">Enter your credentials to continue</p>
                    <form onSubmit={handleSubmit}>
                        <div className="sg_signup_page_input_group">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="sg_signup_page_input"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="sg_signup_page_input"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="sg_signup_page_input_group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="sg_signup_page_input"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="sg_signup_page_input"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="sg_signup_page_input_passwoard">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="sg_signup_page_input"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="sg_signup_page_input"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="sg_signup_page_checkbox_container">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                id="terms"
                                className="sg_signup_page_checkbox"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                            />
                            <label htmlFor="terms" className="sg_signup_page_terms">
                                I agree to all the <span className="sg_signup_page_terms_link">Terms</span> and <span className="sg_signup_page_terms_link">Privacy Policies</span>
                            </label>
                        </div>
                        <button type="submit" className="sg_signup_page_button">Create account</button>
                        <p className="sg_signup_page_login_text">Already have an account? <a href="#" className="sg_signup_page_login_link">Login</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
