import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FarmerIncomeDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    orders: [],
    totalRefunds: 0,
    totalIncomeToday: 0,
    requestsToday: 0,
    ordersTodayCount: 0,
  });

  // Hardcoded farmerId 
  const farmerId = '613b6cfd9c2e123456789abc'; // Replace with a valid farmerId 

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/income/dashboard`);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [farmerId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container max-w-5xl mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Farmer Income Dashboard</h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Number of Refunds</h2>
            <p className="text-3xl font-bold text-gray-900">{dashboardData.totalRefunds}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Today's Total Income (LKR)</h2>
            <p className="text-3xl font-bold text-gray-900">{dashboardData.totalIncomeToday.toLocaleString('en-LK')} LKR</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">New Requests Today</h2>
            <p className="text-3xl font-bold text-gray-900">{dashboardData.requestsToday}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Orders Placed Today</h2>
            <p className="text-3xl font-bold text-gray-900">{dashboardData.ordersTodayCount}</p>
          </div>
        </div>

        {/* List of Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">List of Orders</h2>

          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Amount (LKR)</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.amount.toLocaleString('en-LK')} LKR</td>
                  <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmerIncomeDashboard;
