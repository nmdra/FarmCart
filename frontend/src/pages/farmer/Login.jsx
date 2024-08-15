import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('farmers/login', { email, password });
            console.log('Login Response:', response.data);

            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                navigate('/dashboard');
            } else {
                setError('Failed to retrieve token');
            }
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-8">
                    <img src="/path-to-your-logo.png" alt="Logo" className="mx-auto w-12 h-12" />
                    <h1 className="text-2xl font-semibold text-gray-800 mt-4">Welcome back!</h1>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email / Username
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your username or email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
                    >
                        Log in
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        If you don’t have an account, <a href="#" className="text-green-600 hover:text-green-700">Register now</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
