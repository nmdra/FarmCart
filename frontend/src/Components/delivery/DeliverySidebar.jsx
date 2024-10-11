import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom' // Using NavLink for active link detection
import Swal from 'sweetalert2'
import {
    FaTachometerAlt,
    FaTruck,
    FaClipboardList,
    FaUser,
    FaCog,
    FaSignOutAlt,
    FaDollarSign,
} from 'react-icons/fa' // Importing icons from react-icons

const DeliverySidebar = ({ driver }) => {
    const navigate = useNavigate() // Using useNavigate to redirect

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out of the system!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton:
                    'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                cancelButton:
                    'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
            },
            buttonsStyling: false, // Disable default SweetAlert button styling
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/driver/logout') // Navigate to the logout page if confirmed
            } else {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'You are still logged in!',
                    icon: 'info',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton:
                            'bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600',
                    },
                    buttonsStyling: false,
                })
            }
        })
    }

    const personalImageUrl = `${driver?.personalImageUrl}`

    return (
        <aside className="absolute top-6 left-6 w-60 bg-white rounded-lg shadow-lg p-4 mt-8">
            {/* Driver Avatar and Welcome Message */}
            <div className="mb-6 text-center">
                <img
                    src={personalImageUrl || 'default-avatar.png'} // Display driver image or a default avatar
                    alt="Driver Avatar"
                    className="w-16 h-16 rounded-full mx-auto"
                />
                <p className="mt-2 text-gray-700">Hello, {driver?.firstName}</p>
            </div>

            {/* Navigation Links */}
            <nav>
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            to="/driver/dashboard"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${
                                    isActive
                                        ? 'bg-gray-100 border-l-4 border-green-700'
                                        : ''
                                }`
                            }
                        >
                            <FaTachometerAlt className="w-5 h-5 mr-3" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/ongoing"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${
                                    isActive
                                        ? 'bg-gray-100 border-l-4 border-green-700'
                                        : ''
                                }`
                            }
                        >
                            <FaTruck className="w-5 h-5 mr-3" />
                            Ongoing Deliveries
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/driver/deliveries"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${
                                    isActive
                                        ? 'bg-gray-100 border-l-4 border-green-700'
                                        : ''
                                }`
                            }
                        >
                            <FaClipboardList className="w-5 h-5 mr-3" />
                            Deliveries
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/driver/profile"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${
                                    isActive
                                        ? 'bg-gray-100 border-l-4 border-green-700'
                                        : ''
                                }`
                            }
                        >
                            <FaUser className="w-5 h-5 mr-3" />
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/driver/income"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${
                                    isActive
                                        ? 'bg-gray-100 border-l-4 border-green-700'
                                        : ''
                                }`
                            }
                        >
                            <FaDollarSign className="w-5 h-5 mr-3" />
                            Income
                        </NavLink>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center p-2 text-gray-700 rounded-md hover:bg-red-500 hover:text-white"
                        >
                            <FaSignOutAlt className="w-5 h-5 mr-3" />
                            Log-out
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default DeliverySidebar
