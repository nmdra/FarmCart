import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeliverySidebar from '../../Components/delivery/DeliverySidebar'; // Sidebar for driver

const ViewDeliveries = () => {
    const [deliveries, setDeliveries] = useState([]); // Store deliveries
    const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering
    const [filteredDeliveries, setFilteredDeliveries] = useState([]); // Filtered deliveries
    const [page, setPage] = useState(1); // Current page
    const [totalPages, setTotalPages] = useState(1); // Total pages
    const [filterStatus, setFilterStatus] = useState('All Deliveries'); // Delivery status filter
    const [driver, setDriver] = useState(null); // Driver profile

    const navigate = useNavigate();

    // Fetch driver profile and deliveries on component mount
    useEffect(() => {
        const fetchDriverAndDeliveries = async () => {
            const driverToken = localStorage.getItem('driverToken');
            if (!driverToken) {
                navigate('/driver/login'); // Redirect to login if no token
                return;
            }

            try {
                // Fetch driver profile
                const { data: driverData } = await axios.get('/api/drivers/profile', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                });
                setDriver(driverData); // Store driver info

                // Fetch deliveries assigned to this driver
                const { data: deliveryData } = await axios.get(`/api/delivery/driver/${driverData._id}`, {
                    params: { search: searchTerm, page, limit: 20 },
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                });
                setDeliveries(deliveryData.deliveries);
                setTotalPages(deliveryData.pages);
                setFilteredDeliveries(deliveryData.deliveries); // Initialize with all deliveries
            } catch (error) {
                console.error('Error fetching deliveries:', error);
            }
        };

        fetchDriverAndDeliveries();
    }, [searchTerm, page, navigate]);

    // Handle search input change and filter deliveries
    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        if (searchValue === '') {
            applyStatusFilter(filterStatus); // Reapply status filter if search is cleared
        } else {
            const filtered = deliveries.filter(
                (delivery) =>
                    delivery.trackingID
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    delivery.oID
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    delivery.shopName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    (delivery.customerName &&
                        delivery.customerName
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()))
            );
            setFilteredDeliveries(filtered);
        }
    };

    // Handle status filter
    const applyStatusFilter = (status) => {
        setFilterStatus(status);

        if (status === 'All Deliveries') {
            setFilteredDeliveries(deliveries); // Show all deliveries
        } else {
            const filtered = deliveries.filter(
                (delivery) => delivery.deliveryStatus === status
            );
            setFilteredDeliveries(filtered);
        }

        setPage(1); // Reset to first page when filter changes
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleView = (id) => {
        navigate(`/driver/delivery/${id}`); // Redirect to the delivery view page with the delivery ID
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DeliverySidebar driver={driver} />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Your Deliveries
                    </h2>

                    {/* Search box */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search deliveries by tracking ID, shop name, or customer name"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Status filter buttons */}
                    <div className="flex justify-center mb-4 space-x-4">
                        <button
                            onClick={() => applyStatusFilter('All Deliveries')}
                            className={`px-4 py-2 rounded-md focus:outline-none ${
                                filterStatus === 'All Deliveries' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                            }`}
                        >
                            All Deliveries
                        </button>
                        <button
                            onClick={() => applyStatusFilter('Ready')}
                            className={`px-4 py-2 rounded-md focus:outline-none ${
                                filterStatus === 'Ready' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                            }`}
                        >
                            Ready
                        </button>
                        <button
                            onClick={() => applyStatusFilter('Picked Up')}
                            className={`px-4 py-2 rounded-md focus:outline-none ${
                                filterStatus === 'Picked Up' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                            }`}
                        >
                            Picked Up
                        </button>
                        <button
                            onClick={() => applyStatusFilter('On The Way')}
                            className={`px-4 py-2 rounded-md focus:outline-none ${
                                filterStatus === 'On The Way' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                            }`}
                        >
                            On The Way
                        </button>
                        <button
                            onClick={() => applyStatusFilter('Delivered')}
                            className={`px-4 py-2 rounded-md focus:outline-none ${
                                filterStatus === 'Delivered' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                            }`}
                        >
                            Delivered
                        </button>
                    </div>

                    {/* Deliveries table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 text-sm">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-3 py-2 border text-left">#</th>
                                    <th className="px-3 py-2 border text-left">Tracking ID</th>
                                    <th className="px-3 py-2 border text-left">Shop Name</th>
                                    <th className="px-3 py-2 border text-left">Pickup Address</th>
                                    <th className="px-3 py-2 border text-left">Dropoff Address</th>
                                    <th className="px-3 py-2 border text-left">Status</th>
                                    <th className="px-3 py-2 border text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDeliveries.length > 0 ? (
                                    filteredDeliveries.map((delivery, index) => (
                                        <tr key={delivery._id} className="hover:bg-gray-100">
                                            <td className="px-3 py-2 border text-left">
                                                {(page - 1) * 20 + index + 1}
                                            </td>
                                            <td className="px-3 py-2 border">{delivery.trackingID}</td>
                                            <td className="px-3 py-2 border">{delivery.shopName}</td>
                                            <td className="px-3 py-2 border">{delivery.pickupAddress}</td>
                                            <td className="px-3 py-2 border">{delivery.dropOffAddress}</td>
                                            <td className="px-3 py-2 border">{delivery.deliveryStatus}</td>
                                            <td className="px-3 py-2 border">
                                                <button
                                                    className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                    onClick={() => handleView(delivery._id)} // Add onClick handler
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-3 py-2 border text-center text-gray-600">
                                            No deliveries found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            className={`py-1 px-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ${
                                page === 1 ? 'cursor-not-allowed' : ''
                            }`}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span className="text-gray-700">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            className={`py-1 px-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ${
                                page === totalPages ? 'cursor-not-allowed' : ''
                            }`}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ViewDeliveries;
