import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../../axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [BirthDay, setBirthDay] = useState('');
    const [NIC, setNIC] = useState('');
    const [Address, setAddress] = useState({ houseNo: '', streetName: '', city: '' });
    const [contactNumber, setContactNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('farmers/register', {
                name,
                BirthDay,
                NIC,
                Address,
                email,
                contactNumber,
                password,
            });

            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                setError(err.response.data.message || 'Something went wrong');
            } else if (err.request) {
                setError('Network error, please try again');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <div className="text-center mb-8">
                    <img src="/path-to-your-logo.png" alt="Logo" className="mx-auto w-12 h-12" />
                    <h1 className="text-2xl font-semibold text-gray-800 mt-4">Register</h1>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="BirthDay" className="block text-sm font-medium text-gray-700 text-left">
                            Birth Day
                        </label>
                        <input
                            type="date"
                            id="BirthDay"
                            value={BirthDay}
                            onChange={(e) => setBirthDay(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:ring-green-500 focus:border-green-500"
                            placeholder="Select your birthday"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="NIC" className="block text-sm font-medium text-gray-700 text-left">
                            NIC
                        </label>
                        <input
                            type="text"
                            id="NIC"
                            value={NIC}
                            onChange={(e) => setNIC(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your NIC"
                        />
                    </div>
                    <div className="mb-4 flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700 text-left">
                                House Number
                            </label>
                            <input
                                type="text"
                                id="houseNo"
                                value={Address.houseNo}
                                onChange={(e) => setAddress({ ...Address, houseNo: e.target.value })}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:ring-green-500 focus:border-green-500"
                                placeholder="Enter your house number"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="streetName" className="block text-sm font-medium text-gray-700 text-left">
                                Street Name
                            </label>
                            <input
                                type="text"
                                id="streetName"
                                value={Address.streetName}
                                onChange={(e) => setAddress({ ...Address, streetName: e.target.value })}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:ring-green-500 focus:border-green-500"
                                placeholder="Enter your street name"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                value={Address.city}
                                onChange={(e) => setAddress({ ...Address, city: e.target.value })}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:ring-green-500 focus:border-green-500"
                                placeholder="Enter your city"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 text-left">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            id="contactNumber"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your contact number"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 text-left">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black focus:ring-green-500 focus:border-green-500"
                            placeholder="Confirm your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-1/2 py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300 mx-auto block"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/" className="text-green-600 hover:text-green-700">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
