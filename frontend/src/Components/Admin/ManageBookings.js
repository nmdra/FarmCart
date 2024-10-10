import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/cards";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { Input } from "../ui/input";

function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/api/bookings/all");
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Ticket Quantity",
      "Ticket Type",
      "Special Request",
      "Booking Date",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredBookings.map((booking) =>
        [
          booking.fullName,
          booking.userEmail,
          booking.userPhone,
          booking.ticketQuantity,
          booking.ticketType,
          booking.specialRequest || "N/A",
          format(new Date(booking.createdAt), "PP"),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "bookings.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card className="w-full h-screen max-w-[1220px] mx-auto mt-5 bg-white rounded-lg shadow-md flex flex-col">
      <CardHeader className="bg-gray-100 p-6">
        <CardTitle className="text-3xl font-semibold text-gray-800">
          Booking Records
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          {/* Search Input */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition"
            />
          </div>

          {/* Export Button */}
          <Button
            onClick={exportToCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition flex items-center"
          >
            <Download className="mr-2 h-5 w-5" /> Export to CSV
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
          <Table className="min-w-full border-separate border-spacing-y-2">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="px-6 py-4 text-left">Full Name</TableHead>
                <TableHead className="px-6 py-4 text-left">Email</TableHead>
                <TableHead className="px-6 py-4 text-left">Phone</TableHead>
                <TableHead className="px-6 py-4 text-left">Ticket Quantity</TableHead>
                <TableHead className="px-6 py-4 text-left">Ticket Type</TableHead>
                <TableHead className="px-6 py-4 text-left">Special Request</TableHead>
                <TableHead className="px-6 py-4 text-left">Booking Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBookings.map((booking) => (
                <TableRow key={booking._id} className="bg-white shadow-sm hover:bg-gray-50 transition">
                  <TableCell className="px-6 py-4 font-medium text-gray-800">
                    {booking.fullName}
                  </TableCell>
                  <TableCell className="px-6 py-4">{booking.userEmail}</TableCell>
                  <TableCell className="px-6 py-4">{booking.userPhone}</TableCell>
                  <TableCell className="px-6 py-4">{booking.ticketQuantity}</TableCell>
                  <TableCell className="px-6 py-4">{booking.ticketType}</TableCell>
                  <TableCell className="px-6 py-4">{booking.specialRequest || 'N/A'}</TableCell>
                  <TableCell className="px-6 py-4">
                    {format(new Date(booking.createdAt), "PP")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 transition px-4 py-2 rounded-md"
            >
              <ChevronLeft className="mr-2 h-5 w-5" /> Previous
            </Button>
            <span className="text-sm font-medium text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 hover:bg-gray-400 transition px-4 py-2 rounded-md"
            >
              Next <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default BookingTable;
