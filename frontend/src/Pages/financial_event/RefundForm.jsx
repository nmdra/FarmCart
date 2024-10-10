import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RefundForm = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    reason: '',
    amount: '',
    comments: '',
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('orderId', formData.orderId);
    data.append('reason', formData.reason);
    data.append('amount', formData.amount);
    data.append('comments', formData.comments);
    for (let i = 0; i < formData.images.length; i++) {
      data.append('images', formData.images[i]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/refunds/request', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Refund request submitted successfully!'); // Simple alert message
    } catch (error) {
      alert('Failed to submit refund request. Please try again.'); // Simple alert for errors
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fitted Section for Heading */}
      <div className="text-center py-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">Refund Request</h1>
        <p className="text-gray-600 text-lg mb-2">Submit your refund request quickly and easily.</p>
      </div>

      {/* Navigation Links */}
      <div className="container max-w-5xl mx-auto flex justify-center mb-4">
        <ul className="flex space-x-6 text-lg font-semibold">
          
          <li>
            <Link
              to="/refunds"
              className="text-lime-600 hover:text-lime-800 transition-colors"
            >
              View Refunds
            </Link>
          </li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="container max-w-3xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-lg" style={{ backgroundColor: '#E0F0E0' }}>
        <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-4'>
          {/* Order ID */}
          <div className='w-full'>
            <p className='mb-1 font-semibold text-gray-700 text-lg'>Order ID</p>
            <input
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleInputChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition'
              placeholder="Enter your Order ID"
              required
            />
          </div>

          {/* Reason for Refund */}
          <div className='w-full'>
            <p className='mb-1 font-semibold text-gray-700 text-lg'>Reason for Refund</p>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition'
              placeholder="Describe the reason for your refund"
              required
            />
          </div>

          {/* Refund Amount */}
          <div className='w-full'>
            <p className='mb-1 font-semibold text-gray-700 text-lg'>Refund Amount</p>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition'
              placeholder="Enter the refund amount"
              required
            />
          </div>

          {/* Additional Comments */}
          <div className='w-full'>
            <p className='mb-1 font-semibold text-gray-700 text-lg'>Additional Comments (Optional)</p>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition'
              placeholder="Any additional information"
            />
          </div>

          {/* Upload Images */}
          <div className='w-full'>
            <p className='mb-1 font-semibold text-gray-700 text-lg'>Upload Images (Optional)</p>
            <div className='flex gap-4'>
              {['image1', 'image2', 'image3'].map((img, idx) => (
                <label key={idx} htmlFor={img} className='cursor-pointer w-24 h-24 border border-gray-300 rounded-lg overflow-hidden flex justify-center items-center hover:shadow-md transition'>
                  <input onChange={handleFileChange} type="file" id={img} name="images" hidden />
                  <span className="text-gray-400">Upload</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className='w-full py-3 mt-4 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition transform hover:scale-105'
          >
            Submit Request
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default RefundForm;
