import React, { useState, useEffect } from 'react';
import axios from '../../../axios'; // Ensure correct path to axios
import { useNavigate } from 'react-router-dom';
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar'; // Sidebar component

const DLALLdrivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState([]);

    const navigate = useNavigate();

    // Fetch all drivers when the component mounts
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const { data } = await axios.get('/drivers/drivers'); // API call to get all drivers
                setDrivers(data);
                setFilteredDrivers(data); // Initialize with all drivers
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, []);

    // Handle search input change and filter drivers
    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        if (searchValue === '') {
            setFilteredDrivers(drivers); // Reset to all drivers if search is cleared
        } else {
            const filtered = drivers.filter((driver) =>
                driver.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
                driver.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                driver.phone.includes(searchValue)
            );
            setFilteredDrivers(filtered);
        }
    };

    const handleViewDriver = (id) => {
        navigate(`/manager/view-driver/${id}`); // Redirect to DLViewDriver page with the driver ID
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DLmanageSidebar />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-3xl font-bold mb-6 text-center">All Drivers</h2>

                    {/* Search box */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search drivers by name, email, or phone"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Drivers table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-3 border text-left">Name</th>
                                    <th className="px-6 py-3 border text-left">Email</th>
                                    <th className="px-6 py-3 border text-left">Phone</th>
                                    <th className="px-6 py-3 border text-left">Vehicle Number</th>
                                    <th className="px-6 py-3 border text-left">Availability</th>
                                    <th className="px-6 py-3 border text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDrivers.length > 0 ? (
                                    filteredDrivers.map((driver) => (
                                        <tr key={driver._id} className="hover:bg-gray-100">
                                            <td className="px-6 py-4 border">{driver.fullName}</td>
                                            <td className="px-6 py-4 border">{driver.email}</td>
                                            <td className="px-6 py-4 border">{driver.phone}</td>
                                            <td className="px-6 py-4 border">{driver.vehicleNumber}</td>
                                            <td className="px-6 py-4 border">
                                                <span
                                                    className={`px-2 py-1 text-sm rounded ${
                                                        driver.isAvailable
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    {driver.isAvailable ? 'Available' : 'Unavailable'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 border">
                                            <button
                                                    onClick={() => handleViewDriver(driver._id)} // Handle View button click
                                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                >
                                                    View
                                                </button>

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-4 border text-center text-gray-600"
                                        >
                                            No drivers found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DLALLdrivers;
