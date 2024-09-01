import React, { useState, useEffect } from 'react';
import axios from '../../../axios'; // Corrected path
import { useParams, useNavigate } from 'react-router-dom';

const DLSendEmail = () => {
    const { id } = useParams(); // Get the driver ID from the URL
    const [driverDetails, setDriverDetails] = useState(null);
    const [emailBody, setEmailBody] = useState(''); // State for the email body
    const [emailSubject, setEmailSubject] = useState('Congratulations on Becoming a Driver!');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDriverDetails = async () => {
            try {
                const { data } = await axios.get(`/drivers/${id}`);
                setDriverDetails(data);
                // Set a default email body
                setEmailBody(
                    `Dear ${data.fullName},\n\n` +
                    `Congratulations! Your driver application has been approved. You can now log in to your account using the following credentials:\n\n` +
                    `Username: ${data.email}\n` +
                    `Password: Your ID Card Number\n\n` +
                    `Best regards,\n` +
                    `FarmCart Team`
                );
            } catch (error) {
                console.error('Error fetching driver details:', error);
            }
        };

        fetchDriverDetails();
    }, [id]);

    const handleSendEmail = async () => {
        try {
            await axios.post(`/send-email`, {
                to: driverDetails.email,
                subject: emailSubject,
                body: emailBody,
            });
            alert('Email sent successfully!');
            navigate('/manager/approve-driver');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send the email.');
        }
    };

    if (!driverDetails) return <div>Loading...</div>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Send Approval Email</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Email Subject</h3>
                <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">Email Body</h3>
                <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows="10"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <button
                    onClick={handleSendEmail}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Send Email
                </button>
            </div>
        </div>
    );
};

export default DLSendEmail;
