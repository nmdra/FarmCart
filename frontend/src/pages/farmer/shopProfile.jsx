import { useEffect, useState } from 'react';
import axios from '../../../axios';
import Sidebar from '../../Components/farmer/shopsidebar';
import placeholderImage from '../../assets/shop.png'; // Placeholder image
import { useNavigate } from 'react-router-dom';

const ShopProfile = () => {
  const id = localStorage.getItem('shopId');
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    address: {
      houseNo: '',
      streetName: '',
      city: '',
    },
    category: '',
    email: '',
    contactNumber: '',
    description: '',
  });
  const [shopImage, setShopImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`/shops/${id}`, config);
        setFormData({
          name: data.name,
          district: data.district,
          address: {
            houseNo: data.address.houseNo,
            streetName: data.address.streetName,
            city: data.address.city,
          },
          category: data.category,
          email: data.email,
          contactNumber: data.contactNumber,
          description: data.description,
        });
        setShopImage(data.imageUrl || placeholderImage);
      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    };

    fetchShop();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [addressField]: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    setShopImage(URL.createObjectURL(e.target.files[0]));
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
      await axios.put(`/shops/${id}`, formData, config);
      alert('Shop details updated successfully');
    } catch (error) {
      console.error('Error updating shop details:', error);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`/shops/${id}`, formData.address, config);
      alert('Shop address updated successfully');
    } catch (error) {
      console.error('Error updating shop address:', error);
    }
  };

  const handleDeleteShop = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your shop? This action cannot be undone.');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(`/shops/${id}`, config);
        alert('Shop deleted successfully');
        navigate('/myshop'); // Redirect to shops list page
      } catch (error) {
        console.error('Error deleting shop:', error.response?.data?.message || error.message);
        alert('An error occurred while deleting the shop. Please try again.');
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
          <span className="text-gray-500">Shop Owner</span> &gt; <span className="text-green-500">Shop Profile</span>
        </div>

        {/* Shop Details Card */}
        <form onSubmit={handleSubmit} className="bg-white p-6 pl-8 rounded-lg shadow-md w-2/3 mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-left">Shop Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-left">Category</label>
                <input
                  type="text"
                  name="category"
                  className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                  value={formData.category}
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
                <label className="block text-gray-700 text-left">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-left">Description</label>
                <textarea
                  name="description"
                  className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Shop Image Upload */}
            <div className="flex flex-col items-center mt-4">
              <img
                className="w-48 h-32 object-cover border rounded-md"
                src={shopImage || placeholderImage}
                alt="Shop"
              />
              <label
                className="mt-4 bg-white text-green-500 hover:text-green-600 font-semibold py-2 px-4 border border-green-500 rounded cursor-pointer"
              >
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Shop Address Card */}
        <form onSubmit={handleAddressSubmit} className="bg-white p-6 pl-8 rounded-lg shadow-md w-2/3 mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="block text-gray-700 text-left">House No</label>
              <input
                type="text"
                name="address.houseNo"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value={formData.address.houseNo}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 text-left">Street Address</label>
              <input
                type="text"
                name="address.streetName"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value={formData.address.streetName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 text-left">City</label>
              <input
                type="text"
                name="address.city"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value={formData.address.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col">
              <label className="block text-gray-700 text-left">District</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value="Polonnaruwa"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 text-left">Country</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value="Sri Lanka"
                readOnly
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Delete Shop Card */}
        <div className="bg-white p-6 pl-8 rounded-lg shadow-md w-2/3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Delete Shop</h3>
          <p className="text-gray-600 mb-4">
            Deleting your shop is a permanent action and cannot be undone. Please be sure before proceeding.
          </p>
          <button
            onClick={handleDeleteShop}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Delete Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;
