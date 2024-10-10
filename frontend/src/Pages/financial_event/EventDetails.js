import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import Footer from "../components/CommonComponents/Footer";
import { FaEdit, FaTrashAlt, FaDownload, FaSearch } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import debounce from "lodash.debounce";

function EventDetails() {
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    fullName: "",
    ticketQuantity: 1,
    ticketType: "",
    userEmail: "",
    userPhone: "",
    specialRequest: "",
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [bookings, searchTerm]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings/all");
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      message.error("Failed to fetch bookings. Please try again.");
    }
  };

  // Handle input changes with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    let updatedErrors = { ...errors };

    // Restrict Full Name to alphabetic characters and spaces
    if (name === "fullName") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, ""); // Remove non-alphabetic characters
      if (updatedValue !== value) {
        updatedErrors.fullName = "Only letters and spaces are allowed for Full Name";
      } else {
        delete updatedErrors.fullName;
      }
    }

    // Restrict Ticket Quantity to positive numbers only
    if (name === "ticketQuantity") {
      updatedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      if (updatedValue !== value || updatedValue === "" || Number(updatedValue) <= 0) {
        updatedErrors.ticketQuantity = "Ticket quantity must be a positive number";
      } else {
        delete updatedErrors.ticketQuantity;
      }
    }

    // Validate Email structure
    if (name === "userEmail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        updatedErrors.userEmail = "Invalid email address";
      } else {
        delete updatedErrors.userEmail;
      }
    }

    // Restrict Phone to exactly 10 digits
    if (name === "userPhone") {
      updatedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      if (updatedValue.length > 10) {
        updatedValue = updatedValue.slice(0, 10); // Limit to 10 digits
      }
      if (updatedValue.length !== 10) {
        updatedErrors.userPhone = "Phone number must be exactly 10 digits";
      } else {
        delete updatedErrors.userPhone;
      }
    }

    setFormData({ ...formData, [name]: updatedValue });
    setErrors(updatedErrors);
  };

  const handleEditBooking = (booking) => {
    setIsEditing(true);
    setFormData({
      _id: booking._id,
      fullName: booking.fullName,
      ticketQuantity: booking.ticketQuantity,
      ticketType: booking.ticketType,
      userEmail: booking.userEmail,
      userPhone: booking.userPhone,
      specialRequest: booking.specialRequest,
    });
  };

  const updateBooking = async (updatedBooking) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${updatedBooking._id}`,
        updatedBooking
      );
      return response.data;
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (Object.keys(errors).length > 0) {
      message.error("Please fix the errors in the form.");
      return;
    }

    try {
      await updateBooking(formData);
      setIsEditing(false);
      fetchBookings();
      message.success("Booking updated successfully.");
    } catch (error) {
      console.error("Failed to update booking", error);
      message.error("Failed to update booking. Please try again.");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      message.success("Booking deleted successfully");
    } catch (error) {
      console.error("Failed to delete booking", error);
      message.error("Failed to delete booking. Please try again.");
    }
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.setTextColor(0, 128, 0); // Green color
    doc.text("FarmCart", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text("Event Booking Report", doc.internal.pageSize.getWidth() / 2, 40, { align: "center" });

    const tableColumn = [
      "Full Name",
      "Quantity",
      "Ticket Type",
      "Email",
      "Phone",
      "Special Request",
    ];
    const tableRows = bookings.map((booking) => [
      booking.fullName,
      booking.ticketQuantity,
      booking.ticketType,
      booking.userEmail,
      booking.userPhone,
      booking.specialRequest || "None",
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      theme: "grid",
      styles: { halign: "left" },
    });

    doc.save("event-booking-report.pdf");
  };

  const handleSearch = debounce((searchValue) => {
    const lowercasedFilter = searchValue.toLowerCase();
    const filteredData = bookings.filter((item) =>
      item.fullName.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredBookings(filteredData);
  }, 300); // Debounced search for performance

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-bl from-white to-[#E0F0E0]">
      <section className="p-10 max-w-6xl mx-auto flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-6 tracking-wider">
            Event Bookings
          </h1>
          <button
            onClick={handleDownloadReport}
            className="bg-[#E0F0E0] text-gray-700 px-5 py-3 rounded-lg hover:bg-green-400 transition-all ease-in-out duration-300 flex items-center"
          >
            <FaDownload className="mr-2" /> Download Report
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <FaSearch className="ml-2 text-gray-500" size={24} />
        </div>

        {filteredBookings.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-600">No bookings found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white rounded-lg shadow-lg border border-gray-100">
              <thead className="bg-[#E0F0E0] text-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Ticket Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Special Request
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-sm">{booking.fullName}</td>
                    <td className="px-6 py-4 text-sm">{booking.ticketQuantity}</td>
                    <td className="px-6 py-4 text-sm">{booking.ticketType}</td>
                    <td className="px-6 py-4 text-sm">{booking.userEmail}</td>
                    <td className="px-6 py-4 text-sm">{booking.userPhone}</td>
                    <td className="px-6 py-4 text-sm">
                      {booking.specialRequest || "None"}
                    </td>
                    <td className="px-6 py-4 flex space-x-4 text-sm">
                      <button
                        onClick={() => handleEditBooking(booking)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaEdit className="inline mr-1" />
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrashAlt className="inline mr-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Edit Booking
            </h3>
            <div className="space-y-4">
              <label className="block">
                Full Name:
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
              </label>
              <label className="block">
                Ticket Quantity:
                <input
                  type="number"
                  name="ticketQuantity"
                  value={formData.ticketQuantity}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                {errors.ticketQuantity && (
                  <p className="text-red-500">{errors.ticketQuantity}</p>
                )}
              </label>
              <label className="block">
                Ticket Type:
                <input
                  type="text"
                  name="ticketType"
                  value={formData.ticketType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </label>
              <label className="block">
                Email:
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                {errors.userEmail && <p className="text-red-500">{errors.userEmail}</p>}
              </label>
              <label className="block">
                Phone:
                <input
                  type="tel"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                {errors.userPhone && <p className="text-red-500">{errors.userPhone}</p>}
              </label>
              <label className="block">
                Special Request:
                <textarea
                  name="specialRequest"
                  value={formData.specialRequest}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </label>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default EventDetails;
