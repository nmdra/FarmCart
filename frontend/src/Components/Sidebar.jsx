import {
    HiOutlineHome,
    HiOutlineClock,
    HiOutlineShoppingBag,
    HiOutlineCog,
} from 'react-icons/hi2'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <nav className="p-6 w-64 min-h-fit max-h-96 bg-white shadow-lg mt-4 border-2 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Navigation</h2>
            <ul className="space-y-4">
                <li>
                    <NavLink
                        to="/userDashboard"
                        className={({ isActive }) =>
                            `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-100 border-l-4 border-green-700 ' : ''}`
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
                            `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-100 border-l-4 border-green-700 ' : ''}`
                        }
                    >
                        <HiOutlineClock className="mr-2 h-5 w-5" />
                        Order History
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink
                        to="/shopping-cart"
                        className={({ isActive }) =>
                            `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-100 border-l-4 border-green-700 ' : ''}`
                        }
                    >
                        <HiOutlineShoppingBag className="mr-2 h-5 w-5" />
                        Shopping Cart
                    </NavLink>
                </li> */}
                <li>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-100 border-l-4 border-green-700 ' : ''}`
                        }
                    >
                        <HiOutlineCog className="mr-2 h-5 w-5" />
                        Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/logout"
                        className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                        <HiOutlineCog className="mr-2 h-5 w-5" />
                        Log-out
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar
