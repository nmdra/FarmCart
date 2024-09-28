import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the ID from the URL
import axios from 'axios'; // Make sure this is correctly configured

const DLViewDelivery = () => {
    const { id } = useParams(); // Get the delivery ID from the URL
    const [delivery, setDelivery] = useState(null); // State for storing delivery data
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDelivery = async () => {
            try {
                const { data } = await axios.get(`/api/delivery/d/${id}`); // Fetch delivery by ID
                setDelivery(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching delivery:', error);
            }
        };

        fetchDelivery();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Delivery Details</h2>

                    {delivery ? (
                        <div className="grid grid-cols-2 gap-4">
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
                                <p>{delivery.customerName || 'N/A'}</p>
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
                                        : 'Ongoing'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p>No delivery details found.</p>
                    )}

                    {/* Download Button */}
                    <div className="mt-6 text-center">
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                            onClick={() => { /* Do nothing for now */ }}
                        >
                            Download
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DLViewDelivery;
