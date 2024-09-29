import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeliverySidebar from '../../../Components/delivery/DeliverySidebar';

const ViewDelivery = () => {
    const { id } = useParams(); // Get the delivery ID from the URL
    const [delivery, setDelivery] = useState(null); // State for storing delivery data
    const [driver, setDriver] = useState(null); // State for driver info
    const [loading, setLoading] = useState(true); // Loading state
    const driverToken = localStorage.getItem('driverToken'); // Get driver token from localStorage
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDelivery = async () => {
            if (!driverToken) {
                navigate('/driver/login'); // Redirect to login if token is missing
                return;
            }

            try {
                // Fetch the driver profile
                const driverRes = await axios.get('/api/drivers/profile', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                });
                setDriver(driverRes.data); // Set driver profile

                // Fetch the delivery details using the delivery ID from the URL
                const deliveryRes = await axios.get(`/api/delivery/d/${id}`, {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                });
                setDelivery(deliveryRes.data); // Set delivery details
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching delivery details:', error);
                setLoading(false);
            }
        };

        fetchDelivery();
    }, [driverToken, id, navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DeliverySidebar driver={driver} />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center">Delivery Details</h1>

                    {delivery ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Displaying all delivery details */}
                            <div>
                                <h3 className="font-semibold">Tracking ID:</h3>
                                <p>{delivery.trackingID}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Order ID:</h3>
                                <p>{delivery.oID}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Driver ID:</h3>
                                <p>{delivery.drID}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Shop Name:</h3>
                                <p>{delivery.shopName}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Pickup Address:</h3>
                                <p>{delivery.pickupAddress}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Customer Name:</h3>
                                <p>{delivery.customerName}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Dropoff Address:</h3>
                                <p>{delivery.dropOffAddress}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Assigned Time:</h3>
                                <p>{new Date(delivery.assignDateTime).toLocaleString()}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Delivery Status:</h3>
                                <p>{delivery.deliveryStatus}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Delivered Time:</h3>
                                <p>
                                    {delivery.deliveredDateTime
                                        ? new Date(delivery.deliveredDateTime).toLocaleString()
                                        : 'Not Delivered Yet'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">No delivery details found.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ViewDelivery;
