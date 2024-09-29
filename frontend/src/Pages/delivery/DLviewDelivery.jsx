import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use navigate to handle navigation
import axios from 'axios'; // Make sure this is correctly configured
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF-autotable for table formatting
import farmcartLogo from '../../assets/logo.png'; // Make sure you have your logo here
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar'; // Sidebar component

const DLViewDelivery = () => {
    const { id } = useParams(); // Get the delivery ID from the URL
    const [delivery, setDelivery] = useState(null); // State for storing delivery data
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // To handle navigation if needed

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

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    // Function to generate the PDF
    const generatePDF = () => {
        const doc = new jsPDF();

        // Add logo
        doc.addImage(farmcartLogo, 'PNG', 10, 10, 50, 20); // Add logo with width and height
        
        // Add title
        doc.setFontSize(22);
        doc.text("Delivery Details", 105, 40, null, null, 'center'); // Title centered at the top
        
        // Add company name
        doc.setFontSize(12);
        doc.text("FarmCart Lanka (PVT.) LTD", 105, 50, null, null, 'center');
        doc.text("No.78, Malabe, Colombo", 105, 55, null, null, 'center');
        doc.text("(+94) 011 34 56 837", 105, 60, null, null, 'center');
        doc.text("www.farmcart.com", 105, 65, null, null, 'center');

        // Move down to add delivery details table
        doc.setFontSize(12);
        doc.text("Delivery Information", 14, 80); // Left-aligned delivery information

        // Create a table with delivery details
        doc.autoTable({
            startY: 85, // Starting position on the Y-axis
            head: [['Field', 'Details']], // Table headers
            body: [
                ['Tracking ID', delivery.trackingID],
                ['Order ID', delivery.oID],
                ['Driver ID', delivery.drID],
                ['Shop Name', delivery.shopName],
                ['Pickup Address', delivery.pickupAddress],
                ['Customer Name', delivery.customerName || 'N/A'],
                ['Dropoff Address', delivery.dropOffAddress],
                ['Assigned Time', new Date(delivery.assignDateTime).toLocaleString()],
                ['Delivery Status', delivery.deliveryStatus],
                [
                    'Delivered Time',
                    delivery.deliveredDateTime
                        ? new Date(delivery.deliveredDateTime).toLocaleString()
                        : 'Ongoing',
                ],
            ],
            theme: 'grid', // Use grid theme for the table
            headStyles: { fillColor: [46, 204, 113] }, // Green background for headers
            bodyStyles: { textColor: [0, 0, 0] }, // Black text color for table body
        });

        // Save the PDF with a dynamic name based on the delivery ID
        doc.save(`Delivery_${delivery.trackingID}.pdf`);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DLmanageSidebar />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
                        Delivery Details
                    </h2>

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
                            onClick={generatePDF}
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
