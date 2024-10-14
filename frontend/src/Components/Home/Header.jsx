import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../../assets/logo.png'
import CartButton from './CartButton'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [cartItemCount, setCartItemCount] = useState(0) // Initialize cart item count as 0
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    // Fetch cart from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || []

    const dropdownRef = useRef(null) // Ref for dropdown menu

    useEffect(() => {
        setIsLoggedIn(!!user) // Set isLoggedIn based on user presence
    }, [user])

    useEffect(() => {
        // Calculate total item count
        const totalItemCount = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        )

        // Set cart item count
        setCartItemCount(totalItemCount)
    }, [cartItems])

    useEffect(() => {
        // Close dropdown if click outside of it
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false)
            }
        }

        // Add event listener to detect outside click
        document.addEventListener('mousedown', handleClickOutside)

        // Clean up event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    const handleLogout = async (e) => {
        e.preventDefault()
        if (window.confirm('Are you sure you want to log out?')) {
            try {
                await axios.post(
                    '/api/users/logout',
                    {},
                    { withCredentials: true }
                )
                localStorage.removeItem('user')
                setIsLoggedIn(false)
                setIsDropdownOpen(false)
                navigate('/login')
            } catch (error) {
                console.error('Error logging out', error)
            }
        }
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <div>
            <div className="flex items-center justify-between py-6 mx-auto border-b max-w-7xl">
                <div>
                    <Link to="/">
                        <img src={logo} alt="Logo" width={160} height={160} />
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-4 text-sm">
                            <div className="pr-2">
                                <Link to="/help">Help & Support</Link>
                            </div>

                            <CartButton cartItemCount={cartItemCount} />

                            <button
                                className="flex items-center gap-2"
                                onClick={() => navigate('/userDashboard')}
                            >
                                {user?.firstname} {user?.lastname}
                            </button>

                            {/* User Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    id="user-menu-button"
                                    aria-expanded={isDropdownOpen}
                                    onClick={toggleDropdown}
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="w-8 h-8 rounded-full ring-green-700 ring-2"
                                        src={user?.pic}
                                        alt="User profile"
                                    />
                                </button>

                                {/* Dropdown menu */}
                                {isDropdownOpen && (
                                    <div
                                        className="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                                        id="user-dropdown"
                                    >
                                        <div className="px-4 py-3">
                                            <span className="block text-sm text-gray-900 dark:text-white">
                                                {user?.firstname}{' '}
                                                {user?.lastname}
                                            </span>
                                            <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                                                {user?.email}
                                            </span>
                                        </div>
                                        <ul
                                            className="py-2"
                                            aria-labelledby="user-menu-button"
                                        >
                                            <li>
                                                <Link
                                                    to="/userDashboard"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/settings"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                >
                                                    Settings
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/orderHistory"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                >
                                                    Orders
                                                </Link>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                    onClick={handleLogout}
                                                >
                                                    Sign out
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/blog"
                                    className="text-black hover:text-[#99DD05] cursor-pointer hover:underline text-sm"
                                >
                                    Blog
                                </Link>

                                <Link
                                    to="/farmerRegister"
                                    className="text-black hover:text-[#99DD05] cursor-pointer hover:underline text-sm"
                                >
                                    Become a Seller
                                </Link>
                                <Link
                                    to="/register-driver"
                                    className="text-black hover:text-[#99DD05] cursor-pointer hover:underline text-sm"
                                >
                                    Become a Driver
                                </Link>
                                <Link
                                    to="/help"
                                    className="text-black hover:text-[#99DD05] cursor-pointer hover:underline text-sm"
                                >
                                    Help & Support
                                </Link>
                            </div>
                            <Link to="/register">
                                <button className="py-3 border border-black hover:border-[#99DD05] rounded-lg px-7 hover:bg-[#99DD05]">
                                    SignUp
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="py-3 bg-[#99DD05] rounded-lg px-7 hover:bg-[#99DD05]/60">
                                    Login
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
