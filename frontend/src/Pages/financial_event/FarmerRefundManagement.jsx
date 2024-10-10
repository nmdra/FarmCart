import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const FarmerRefundManagement = () => {
  const [refunds, setRefunds] = useState([]);
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/refunds/all');
        setRefunds(response.data);
        setFilteredRefunds(response.data);
      } catch (error) {
        console.error('Error fetching refunds:', error);
      }
    };

    fetchRefunds();
  }, []);

  const handleStatusChange = (refundId, newStatus) => {
    setStatus((prev) => ({
      ...prev,
      [refundId]: newStatus,
    }));

    if (newStatus === 'Accepted') {
      setSelectedRefund(refundId);
    } else {
      setSelectedRefund(null);
    }
  };

  const handleSubmitStatus = async (refundId) => {
    try {
      await axios.put(`http://localhost:5000/api/refunds/update-status/${refundId}`, {
        status: status[refundId],
      });
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleProceedPayment = (refundId) => {
    alert(`Proceeding to payment for refund ID: ${refundId}`);
  };

  // Search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterRefunds(e.target.value, statusFilter);
  };

  // Filter by status
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    filterRefunds(searchTerm, e.target.value);
  };

  // Filter logic for search and status
  const filterRefunds = (search, status) => {
    let filtered = refunds;
    if (search) {
      filtered = filtered.filter((refund) =>
        refund.orderId.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status !== 'All') {
      filtered = filtered.filter((refund) => refund.status === status);
    }
    setFilteredRefunds(filtered);
  };

  // Delete Refund
  const handleDelete = async (refundId) => {
    try {
      await axios.delete(`http://localhost:5000/api/refunds/delete/${refundId}`);
      alert('Refund deleted successfully');
      setRefunds(refunds.filter((refund) => refund._id !== refundId));
      setFilteredRefunds(filteredRefunds.filter((refund) => refund._id !== refundId));
    } catch (error) {
      console.error('Error deleting refund:', error);
      alert('Failed to delete refund');
    }
  };

  // PDF Report Generation
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Refund Report', 14, 16);
    doc.autoTable({
      startY: 22,
      head: [['Order ID', 'Status', 'Amount', 'Reason']],
      body: filteredRefunds.map((refund) => [
        refund.orderId,
        refund.status,
        refund.amount,
        refund.reason,
      ]),
    });
    doc.save('refund_report.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="text-center py-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">Manage Refund Requests</h1>
        <p className="text-gray-600 text-lg mb-2">View and manage your refund requests efficiently.</p>
      </div>

      {/* Search, Sort, and Report */}
      <div className="container max-w-3xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-lg" style={{ backgroundColor: '#E0F0E0' }}>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border rounded-lg w-1/2"
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="p-2 border rounded-lg w-1/4"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            onClick={generatePDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Report
          </button>
        </div>

        {/* Refund Requests List */}
        <div className="grid gap-6">
          {filteredRefunds.map((refund) => (
            <div key={refund._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-lg font-bold mb-2">Order ID: {refund.orderId}</h2>
              <p className="mb-2">Reason: {refund.reason}</p>
              <p className="mb-2">Amount: {refund.amount}</p>
              <p className="mb-2">Current Status: {refund.status}</p>

              {/* Status Dropdown and Button */}
              <div className="mt-4">
                <label htmlFor={`status-${refund._id}`} className="block font-semibold mb-2">
                  Update Status:
                </label>
                <select
                  id={`status-${refund._id}`}
                  className="p-2 border rounded-lg w-full"
                  value={status[refund._id] || refund.status}
                  onChange={(e) => handleStatusChange(refund._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <button
                  onClick={() => handleSubmitStatus(refund._id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Update Status
                </button>

                {/* Proceed with Payment Button */}
                {status[refund._id] === 'Accepted' && selectedRefund === refund._id && (
                  <button
                    onClick={() => handleProceedPayment(refund._id)}
                    className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Proceed with Payment
                  </button>
                )}

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(refund._id)}
                  className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerRefundManagement;
