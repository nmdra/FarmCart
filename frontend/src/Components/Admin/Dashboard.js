import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/cards";
import { Users, Ticket, Calendar, MapPin, BarChart, PieChart } from 'lucide-react';

function Dashboard() {
  const [bookingsData, setBookingsData] = useState([]);
  const [ticketsData, setTicketsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const bookingsResponse = await axios.get('/api/bookings/all');
      const ticketsResponse = await axios.get('/api/tickets/getTickets');
      setBookingsData(bookingsResponse.data);
      setTicketsData(ticketsResponse.data.tickets);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const getBookingsByDate = () => {
    const bookingsByDate = bookingsData.reduce((acc, booking) => {
      const date = format(new Date(booking.createdAt), 'yyyy-MM-dd');
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(bookingsByDate).map(([date, count]) => ({ date, count }));
  };

  const getTicketsByLocation = () => {
    return ticketsData.reduce((acc, ticket) => {
      acc[ticket.location] = (acc[ticket.location] || 0) + 1;
      return acc;
    }, {});
  };

  const ticketLocationData = Object.entries(getTicketsByLocation());

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-[1220px] mx-auto bg-white rounded-xl shadow-xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800">Analytics Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-700">Total Bookings</CardTitle>
              <Users className="h-6 w-6 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">{bookingsData.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-white shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-700">Total Tickets</CardTitle>
              <Ticket className="h-6 w-6 text-teal-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-600">{ticketsData.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-white shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-700">Next Event</CardTitle>
              <Calendar className="h-6 w-6 text-pink-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-pink-600">
                {ticketsData.length > 0
                  ? format(new Date(Math.min(...ticketsData.map(t => new Date(t.date)))), 'MMM d, yyyy')
                  : 'No upcoming events'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-white shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold text-gray-700">Popular Location</CardTitle>
              <MapPin className="h-6 w-6 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {ticketLocationData.length > 0
                  ? ticketLocationData.reduce((a, b) => a[1] > b[1] ? a : b)[0]
                  : 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-all bg-white rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold">
                <BarChart className="h-6 w-6 mr-2 text-blue-500" />
                Bookings Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getBookingsByDate().slice(-5).map(({ date, count }) => (
                  <div key={date} className="flex items-center">
                    <div className="w-28 text-sm text-gray-600">{date}</div>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(count / Math.max(...getBookingsByDate().map(b => b.count))) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-700">{count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all bg-white rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold">
                <PieChart className="h-6 w-6 mr-2 text-green-500" />
                Tickets by Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ticketLocationData.map(([location, count]) => (
                  <div key={location} className="flex items-center">
                    <div className="w-28 text-sm truncate text-gray-600">{location}</div>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(count / Math.max(...ticketLocationData.map(t => t[1]))) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm text-gray-700">{count}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
