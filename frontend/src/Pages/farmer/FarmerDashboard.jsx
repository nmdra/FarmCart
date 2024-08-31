import { useEffect, useState } from 'react'
import axios from '../../../axios'
import Sidebar from '../../Components/farmer/Farmer_sidebar'
import { useNavigate, Link } from 'react-router-dom'

const Dashboard = () => {
    // State to store farmer details fetched from the backend
    const [farmer, setFarmer] = useState(null)
    const navigate = useNavigate()

    // useEffect hook to fetch farmer details when the component mounts
    useEffect(() => {
        const fetchFarmerDetails = async () => {
            try {
                // Retrieve the token from local storage to authenticate the request
                const token = localStorage.getItem('token')
                console.log(token)
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                }

                // Make an API call to fetch the farmer's profile details
                const { data } = await axios.get('/farmers/profile', config)

                // Set the fetched data into the farmer state
                setFarmer(data)
            } catch (error) {
                // Log any errors that occur during the API call
                console.error('Error fetching farmer details:', error)
            }
        }

        fetchFarmerDetails()
    }, []) // Empty dependency array ensures this effect runs only once when the component mounts

    // Render a loading state until farmer details are fetched
    if (!farmer) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Main Content Container */}
            <div className="flex flex-1 mt-16">
                {/* Fixed Sidebar */}
                <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-32">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 p-24 pt-16 overflow-y-auto">
                    <div className="mb-8">
                        {/* Profile and Details Section */}
                        <div className="flex space-x-8 mb-8">
                            {/* Profile Card */}
                            <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
                                <div className="flex flex-col items-center">
                                    <img
                                        className="w-24 h-24 rounded-full object-cover"
                                        src={farmer.image}
                                        alt="Profile"
                                    />
                                    <h2 className="text-xl font-semibold mt-4 text-gray-800">
                                        {farmer.name}
                                    </h2>
                                    <span className="text-gray-800">
                                        Shop Owner
                                    </span>
                                    <Link
                                        to="/farmerprofile"
                                        className="text-green-500 mt-2 inline-block"
                                    >
                                        Edit details
                                    </Link>
                                </div>
                            </div>

                            {/* Details Card */}
                            <div className="bg-white p-6 rounded-lg shadow-md w-2/3 flex flex-col items-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Address
                                </h3>
                                <p className="text-gray-800 text-center mb-4">
                                    {`${farmer.Address.houseNo}`} <br />
                                    {`${farmer.Address.streetName}`} <br />
                                    {`${farmer.Address.city}`} <br />
                                    {`${farmer.email}`}
                                </p>
                                <Link
                                    to="/farmerprofile"
                                    className="text-green-500"
                                >
                                    Edit Address
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                My Orders
                            </h3>
                            <Link
                                to="#"
                                className="text-green-500 mt-2 inline-block"
                            >
                                View All
                            </Link>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="pb-2 text-gray-600">
                                        ORDER ID
                                    </th>
                                    <th className="pb-2 text-gray-600">DATE</th>
                                    <th className="pb-2 text-gray-600">
                                        TOTAL
                                    </th>
                                    <th className="pb-2 text-gray-600">
                                        STATUS
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Example Order Rows */}
                                <tr className="border-t">
                                    <td className="py-2 text-gray-700">#738</td>
                                    <td className="py-2 text-gray-700">
                                        8 Sep, 2020
                                    </td>
                                    <td className="py-2 text-gray-700">
                                        Rs. 135.00 (5 Products)
                                    </td>
                                    <td className="py-2">
                                        <Link
                                            to="#"
                                            className="text-green-500 mt-2 inline-block"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                                {/* Add more order rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
