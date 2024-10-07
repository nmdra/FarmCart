import {
    HiOutlineHome,
    HiOutlineClock,
    HiOutlineCog,
    HiOutlineSparkles,
    HiOutlineArrowLeftStartOnRectangle,
} from 'react-icons/hi2'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import ConfirmationModal from './ConfirmationModal' // Adjust the import path as necessary

const Sidebar = () => {
    const navigate = useNavigate()
    const [isModalOpen, setModalOpen] = useState(false)

    const handleLogout = async () => {
        try {
            // Call the logout API
            await axios.post('/api/users/logout', {}, { withCredentials: true })
            localStorage.removeItem('user')
            navigate('/login')
        } catch (error) {
            console.error('Error logging out', error)
        }
    }

    return (
        <nav className="p-6 w-64 max-w-64 min-w-64 min-h-fit max-h-96 bg-white shadow-lg mt-4 border-2 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Navigation</h2>
            <ul className="space-y-4">
                <li>
                    <NavLink
                        to="/userDashboard"
                        className={({ isActive }) =>
                            `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-100 border-l-4 border-green-700' : ''}`
                        }
                    >
                        <HiOutlineHome className="mr-2 h-5 w-5" />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/orderhistory"
                        className={({ isActive }) =>
                            `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-100 border-l-4 border-green-700' : ''}`
                        }
                    >
                        <HiOutlineClock className="mr-2 h-5 w-5" />
                        Order History
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-100 border-l-4 border-green-700' : ''}`
                        }
                    >
                        <HiOutlineCog className="mr-2 h-5 w-5" />
                        Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/membership"
                        className={({ isActive }) =>
                            `flex items-center p-2 text-gray-700 rounded-md hover:bg-amber-100 ${isActive ? 'bg-amber-100 border-l-4 border-amber-500' : ''}`
                        }
                    >
                        <HiOutlineSparkles className="mr-2 h-5 w-5" />
                        Upgrade Membership
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/logout"
                        className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
                        onClick={(e) => {
                            e.preventDefault()
                            setModalOpen(true)
                        }}
                    >
                        <HiOutlineArrowLeftStartOnRectangle className="mr-2 h-5 w-5" />
                        Log-out
                    </NavLink>
                </li>
            </ul>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={() => {
                    handleLogout()
                    setModalOpen(false)
                }}
            />
        </nav>
    )
}

export default Sidebar
