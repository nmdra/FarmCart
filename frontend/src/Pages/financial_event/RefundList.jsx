import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RefundList = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/refunds/all');
        setRefunds(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching refund requests:', error);
        toast.error("Failed to fetch refund requests");
        setLoading(false);
      }
    };

    fetchRefunds();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex flex-col w-full items-start gap-8 p-6 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto' style={{ backgroundColor: '#E0F0E0' }}>
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Your Refund Requests</h2>

      {refunds.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No refund requests found.</p>
      ) : (
        refunds.map((refund) => (
          <div key={refund._id} className='flex flex-col w-full p-6 bg-white rounded-lg shadow-md border border-gray-200 transition'>
            <div className="flex flex-wrap gap-6 justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-gray-800">Order ID: {refund.orderId}</h3>
              <p className="font-semibold text-gray-600">Reason: {refund.reason}</p>
              <p className="font-semibold text-gray-600">Amount: {refund.amount}</p>
              
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                  refund.status === 'Pending'
                    ? 'bg-yellow-200 text-yellow-700'
                    : refund.status === 'Approved'
                    ? 'bg-green-200 text-green-700'
                    : 'bg-red-200 text-red-700'
                }`}
              >
                {refund.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RefundList;
