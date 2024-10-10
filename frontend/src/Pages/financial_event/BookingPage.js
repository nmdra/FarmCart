import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
    const { id } = useParams(); // Get event ID from URL
    const [event, setEvent] = useState(null); // Store event data
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        ticketQuantity: 1,
        ticketType: '',
        specialRequests: ''
    });
    const [errors, setErrors] = useState({});
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser ? currentUser.userID : null; // Safely get userID

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`/api/tickets/getTickets/${id}`);
                setEvent(response.data); // Set event data once it's fetched
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };
        fetchEventDetails();
    }, [id]);

    // Handle form data changes with strict validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        let inputValue = value;
        let updatedErrors = { ...errors };

        // Validation logic for Full Name (allow only alphabetic characters and space)
        if (name === 'fullName') {
            inputValue = value.replace(/[^A-Za-z\s]/g, ''); // Remove non-alphabetic characters
            if (value !== inputValue) {
                updatedErrors.fullName = 'Only letters and spaces are allowed for Full Name';
            } else {
                delete updatedErrors.fullName;
            }
        }

        // Validation logic for Phone (allow only numbers, and exactly 10 digits)
        if (name === 'phone') {
            inputValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
            if (inputValue.length > 10) {
                inputValue = inputValue.slice(0, 10); // Restrict to 10 digits
            }
            if (inputValue.length !== 10) {
                updatedErrors.phone = 'Phone number must be exactly 10 digits';
            } else {
                delete updatedErrors.phone;
            }
        }

        // Validation logic for Email (check if email structure is valid)
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern
            if (!emailRegex.test(value)) {
                updatedErrors.email = 'Invalid email address';
            } else {
                delete updatedErrors.email;
            }
        }

        // Set the sanitized input value to the state
        setFormData({ ...formData, [name]: inputValue });
        setErrors(updatedErrors);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform final validation checks before submission
        if (Object.keys(errors).length > 0) {
            alert('Please fix the errors in the form.');
            return;
        }

        try {
            const bookingData = {
                userId,
                ticketId: id,
                fullName: formData.fullName,
                ticketQuantity: formData.ticketQuantity,
                userEmail: formData.email,
                userPhone: formData.phone,
                ticketType: formData.ticketType,
                specialRequests: formData.specialRequests,
            };

            const response = await axios.post('/api/bookings/create', bookingData);

            if (response.status === 201) {
                alert('Booking created successfully!');
            } else {
                console.error('Error creating booking:', response.data.message);
            }
        } catch (error) {
            console.error('Error submitting the booking:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-wrap md:flex-nowrap transform transition-all duration-500 hover:shadow-2xl">
                
                {/* Event image section */}
                <div className="w-full md:w-1/2 p-4 relative">
                    {event && (
                        <img
                            src={event.image}
                            alt={event.title}
                            className="object-cover rounded-md shadow-md w-full h-64 md:h-full"
                        />
                    )}
                </div>

                {/* Booking form section */}
                <div className="w-full md:w-1/2 p-8" style={{ backgroundColor: '#E0F0E0' }}>
                    <h1 className="text-4xl font-bold text-green-700 mb-6">Reserve Your Event</h1>
                    <p className="text-gray-600 text-lg mb-6">Fill out the details below to confirm your booking.</p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="form-group">
                            <label htmlFor="fullName" className="block text-lg font-semibold text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                            {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
                        </div>

                        {/* Email Address */}
                        <div className="form-group">
                            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="johndoe@example.com"
                            />
                            {errors.email && <p className="text-red-500">{errors.email}</p>}
                        </div>

                        {/* Phone Number */}
                        <div className="form-group">
                            <label htmlFor="phone" className="block text-lg font-semibold text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="07X XXXXXXX"
                            />
                            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                        </div>

                        {/* Ticket Quantity */}
                        <div className="form-group">
                            <label htmlFor="ticketQuantity" className="block text-lg font-semibold text-gray-700">Number of Tickets</label>
                            <input
                                type="number"
                                id="ticketQuantity"
                                name="ticketQuantity"
                                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
                                value={formData.ticketQuantity}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                        </div>

                        {/* Ticket Type */}
                        <div className="form-group">
                            <label htmlFor="ticketType" className="block text-lg font-semibold text-gray-700">Ticket Type</label>
                            <select
                                id="ticketType"
                                name="ticketType"
                                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
                                value={formData.ticketType}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select a Ticket Type</option>
                                <option value="Standard">Standard</option>
                                <option value="VIP">VIP</option>
                                <option value="Premium">Premium</option>
                            </select>
                        </div>

                        {/* Special Requests */}
                        <div className="form-group">
                            <label htmlFor="specialRequests" className="block text-lg font-semibold text-gray-700">Special Requests</label>
                            <textarea
                                id="specialRequests"
                                name="specialRequests"
                                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                placeholder="Any special requests?"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full mt-6 bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:from-green-500 hover:to-green-700 transition duration-300"
                        >
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
