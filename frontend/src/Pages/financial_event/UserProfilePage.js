import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

function UserProfilePage() {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        ticketId: "",
        fullName: "",
        ticketQuantity: "",
        userEmail: "",
        userPhone: "",
        ticketType: "",
        specialRequest: "",
    });
    const [bookings, setBookings] = useState([]); // State to store user bookings

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            setUser(currentUser);
            fetchUserBookings(currentUser.userID);
        }
    }, []);

    // Fetch user bookings
    const fetchUserBookings = async (userID) => {
        try {
            const response = await axios.get(`/api/bookings/user/${userID}`);
            setBookings(response.data.bookings);
        } catch (error) {
            console.error("Failed to fetch bookings", error);
            message.error("Failed to fetch bookings. Please try again.");
        }
    };

    // Handle edit booking
const handleEditBooking = (booking) => {
    setIsEditing(true);
    setFormData({
        _id: booking._id,  // Include _id in the form data
        ticketId: booking.ticketId,
        fullName: booking.fullName,
        ticketQuantity: booking.ticketQuantity,
        userEmail: booking.userEmail,
        userPhone: booking.userPhone,
        ticketType: booking.ticketType,
        specialRequest: booking.specialRequest,
    });
};


    // Handle delete booking
    const handleDeleteBooking = async (bookingId) => {
        try {
            await axios.delete(`/api/bookings/${bookingId}`);
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking._id !== bookingId)
            );
            message.success("Booking deleted successfully");
        } catch (error) {
            console.error("Failed to delete booking", error);
            message.error("Failed to delete booking. Please try again.");
        }
    };

    // Handle input change for booking form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Save booking changes
    const handleSave = async () => {
        try {
            await updateBooking(formData); // Call the updateBooking function
            setIsEditing(false);
            fetchUserBookings(user.userID); // Refresh bookings after edit
            message.success("Booking updated successfully.");
        } catch (error) {
            console.error("Failed to update booking", error);
            message.error("Failed to update booking. Please try again.");
        }
    };

    // Update booking function
    const updateBooking = async (updatedBooking) => {
        try {
            const response = await axios.put(`/api/bookings/${updatedBooking._id}`, updatedBooking);
            return response.data;
        } catch (error) {
            console.error("Error updating booking:", error);
            throw error; // Throw error so it can be caught in handleSave
        }
    };

    return (
        <div className="pp_user-profile-page">
            <div className={`profile-card-1234`}>
                <div className={`profile-header-1234`}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png"
                        alt="Profile"
                    />
                    <div className={`profile-info-1234`}>
                        <h3>
                            {user.firstName} {user.lastName}
                        </h3>
                        <p>{user.userType}</p>
                    </div>
                </div>
                <div className={`profile-details-1234`}>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                </div>
            </div>

            {/* Display Bookings */}
            <div className="pp_additional-features-container">
                <h1>Your Tickets</h1>
                <div className="pp_booking-list">
                    {bookings.length === 0 ? (
                        <p>You have no bookings.</p>
                    ) : (
                        bookings.map((booking) => (
                            <div key={booking._id} className="pp_booking-card">
                                <h3>Ticket ID: {booking.ticketId}</h3>
                                <p>
                                    <strong>Full Name:</strong> {booking.fullName}
                                </p>
                                <p>
                                    <strong>Quantity:</strong> {booking.ticketQuantity}
                                </p>
                                <p>
                                    <strong>Email:</strong> {booking.userEmail}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {booking.userPhone}
                                </p>
                                <p>
                                    <strong>Ticket Type:</strong> {booking.ticketType}
                                </p>
                                <p>
                                    <strong>Special Request:</strong>{" "}
                                    <span className="pp_special-request">
                                        {booking.specialRequest || "None"}
                                    </span>
                                </p>
                                <div className="pp_booking-actions">
                                    <button
                                        className="pp_edit-button"
                                        onClick={() => handleEditBooking(booking)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="pp_delete-button"
                                        onClick={() => handleDeleteBooking(booking._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Edit Booking Modal */}
            {isEditing && (
                <div className="pp_edit-modal">
                    <div className="pp_modal-content">
                        <h3>Edit Booking</h3>
                        <label>
                            Full Name:
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Ticket Quantity:
                            <input
                                type="number"
                                name="ticketQuantity"
                                value={formData.ticketQuantity}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="userEmail"
                                value={formData.userEmail}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                name="userPhone"
                                value={formData.userPhone}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Ticket Type:
                            <input
                                type="text"
                                name="ticketType"
                                value={formData.ticketType}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Special Request:
                            <input
                                type="text"
                                name="specialRequest"
                                value={formData.specialRequest}
                                onChange={handleInputChange}
                            />
                        </label>
                        <div className="pp_modal-buttons">
                            <button className="pp_save-button" onClick={handleSave}>
                                Save
                            </button>
                            <button
                                className="pp_cancel-button"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfilePage;
