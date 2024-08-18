import { useEffect, useState } from 'react';
import axios from '../../../axios';
import Sidebar from '../../Components/farmer/sidebar';
import profilepic from '../../assets/profile.png';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    NIC: '',
    BirthDay: '',
    Address: {
      houseNo: '',
      streetName: '',
      city: '',
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get('/farmers/profile', config);
        setFormData({
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          NIC: data.NIC,
          BirthDay: data.BirthDay,
          Address: data.Address,
        });
      } catch (error) {
        console.error('Error fetching farmer details:', error);
      }
    };

    fetchFarmerDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['houseNo', 'streetName', 'city'].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        Address: {
          ...prevData.Address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put('/farmers/profile', formData, config);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete('/farmers/profile', config);
        alert('Account deleted successfully');
        navigate('/');
      } catch (error) {
        console.error('Error deleting account:', error.response?.data?.message || error.message);
        alert('An error occurred while deleting the account. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen w-screen bg-gray-100">
      <div className="p-6 pt-16 pl-8 rounded-lg shadow-md">
        <Sidebar />
      </div>

      <div className="flex-1 p-8">
        <div className="text-sm text-gray-600 mb-4">
          <span className="text-gray-500">Shop Owner</span> &gt; <span className="text-green-500">Settings</span>
        </div>

        {/* Account Settings Card */}
        <form onSubmit={handleSubmit} className="bg-white p-6 pl-8 rounded-lg shadow-md w-2/3 mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-left">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-left">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-left">Phone Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-left">NIC</label>
                  <input
                    type="text"
                    name="NIC"
                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                    value={formData.NIC}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-left">Birthday</label>
                  <input
                    type="date"
                    name="BirthDay"
                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                    value={formData.BirthDay.substring(0, 10)}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-4">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={profilepic}
                alt="Profile"
              />
              <button type="button" className="mt-4 bg-white text-green-500 hover:text-green-600 font-semibold py-2 px-4 border border-green-500 rounded">
                Choose Image
              </button>
            </div>
          </div>
          <button type="submit" className="flex justify-start mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Save Changes
          </button>
        </form>

        {/* Address Settings Card */}
        <form onSubmit={handleSubmit} className="bg-white p-6 pl-8 rounded-lg shadow-md w-2/3 mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Farmer Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 text-left">House No</label>
              <input
                type="text"
                name="houseNo"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value={formData.Address.houseNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-left">Street Address</label>
              <input
                type="text"
                name="streetName"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value={formData.Address.streetName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-left">City</label>
              <input
                type="text"
                name="city"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value={formData.Address.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div>
              <label className="block text-gray-700 text-left">District</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value={'Polonnaruwa'}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 text-left">Country</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value={'Sri Lanka'}
                readOnly
              />
            </div>
          </div>
          <button type="submit" className="flex justify-start mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Save Changes
          </button>
        </form>

                {/* Delete Account Card */}
          <div className="bg-white p-6 pl-8 rounded-lg shadow-md w-2/3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Delete Account</h3>
          <p className="text-gray-600 mb-4">Deleting your account is a permanent action and cannot be undone. Please be sure before proceeding.</p>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

