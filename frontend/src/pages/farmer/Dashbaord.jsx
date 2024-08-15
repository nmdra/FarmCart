import { useEffect, useState } from 'react';
import axios from '../../../axios';
import Sidebar from '../../Components/farmer/sidebar';
import {useNavigate } from 'react-router-dom';
//import ShopOnwerProfile from './ShopOnwerProfile'

const Dashboard = () => {
  // State to store farmer details fetched from the backend
  const [farmer, setFarmer] = useState(null);
  const navigate = useNavigate();

  // useEffect hook to fetch farmer details when the component mounts
  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        // Retrieve the token from local storage to authenticate the request
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        };

        // Make an API call to fetch the farmer's profile details
        const { data } = await axios.get('/farmers/profile', config);
        
        // Set the fetched data into the farmer state
        setFarmer(data);
      } catch (error) {
        // Log any errors that occur during the API call
        console.error('Error fetching farmer details:', error);
      }
    };

    fetchFarmerDetails();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Render a loading state until farmer details are fetched
  if (!farmer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex max-h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Breadcrumb Navigation */}
        <div className="text-sm text-gray-600 mb-4">
          <span className="text-gray-500">Shop Owner</span> &gt; <span className="text-green-500">Dashboard</span>
        </div>

        {/* Profile and Details Section */}
        <div className="flex items-start space-x-8 mb-8">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <div className="flex flex-col items-center">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src="path/to/profile/image.jpg" // Placeholder for the profile image path
                alt="Profile"
              />
              <h2 className="text-xl font-semibold mt-4 text-gray-800">{farmer.name}</h2>
              <span className="text-gray-600">Shop Owner</span>
              <button className="mt-4 bg-white text-green-500 hover:text-green-600 font-semibold py-2 px-4 border border-green-500 rounded"
               /*  onClick={ () => navigate('/ShopOnwerProfile' )}*/>
                Edit Profile
              </button>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
            <h3 className="text-lg font-semibold text-gray-800">DETAILS</h3>
            <p className="mt-4 text-gray-700">{farmer.name}</p>
            {/* Displaying the farmer's address by combining house number, street name, and city */}
            <p className="text-gray-600">
              {`${farmer.Address.houseNo}, ${farmer.Address.streetName}, ${farmer.Address.city}`}
            </p>
            <button className="mt-4 bg-white text-green-500 hover:text-green-600 font-semibold py-2 px-4 border border-green-500 rounded">
              Edit Address
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">My Orders</h3>
            <button className="bg-white text-green-500 hover:text-green-600 font-semibold py-2 px-4 border border-green-500 rounded">
              View All
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-gray-600">ORDER ID</th>
                <th className="pb-2 text-gray-600">DATE</th>
                <th className="pb-2 text-gray-600">TOTAL</th>
                <th className="pb-2 text-gray-600">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Order Rows */}
              <tr className="border-t">
                <td className="py-2 text-gray-700">#738</td>
                <td className="py-2 text-gray-700">8 Sep, 2020</td>
                <td className="py-2 text-gray-700">Rs. 135.00 (5 Products)</td>
                <td className="py-2">
                  <button className="bg-white text-green-500 hover:text-green-600 font-semibold py-2 px-4 border border-green-500 rounded">
                    View Details
                  </button>
                </td>
              </tr>
              {/* Add more order rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
