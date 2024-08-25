import { useEffect, useState } from 'react';
import axios from '../../../axios';
import Sidebar from '../../Components/farmer/shop_sidebar';
import placeholderImage from '../../assets/shop.png'; // Placeholder image
import { useNavigate } from 'react-router-dom';
import { useDistricts } from '../../hook/district_City';
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
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contactNumber: '',
    category: ''
  });
  const [shopImage, setShopImage] = useState(null);
  const navigate = useNavigate();

  const {
    districts,
    cities,
    handleDistrictChange,
    handleCityChange
  } = useDistricts();

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
        // Fetch and set cities based on shop's district
        if (data.district) {
          handleDistrictChange({ target: { value: data.district } });
        }
      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    };

    fetchShop();
  }, [id]);

  const validateName = (name) => {
    return /^[A-Za-z\s]+$/.test(name); // Only letters and at least 3 characters long
  };
  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email); // Must be a Gmail address
  };

  const validateContactNumber = (contactNumber) => {
    return /^[0-9]{10}$/.test(contactNumber) && contactNumber.startsWith('0'); // Must be 10 digits and start with 0
  };



  const handleChange = (e) => {
    const { name, value } = e.target;

    let error = "";
    switch (name) {
      case 'name':
        error = validateName(value) ? '' : 'Name must contain only letters and spaces';
        break;
      case 'email':
        error = validateEmail(value) ? '' : 'Email must be a valid Gmail address.';
        break;
      case 'contactNumber':
        error = validateContactNumber(value) ? '' : 'Contact number must be 10 digits long and start with 0.';
        break;
        default:
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData((prevData) => ({
              ...prevData,
              address: { ...prevData.address, [addressField]: value },
            }));
            return;
          }
      }
      
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    };
    const DistrictChange = async (e) => {
      const selectedDistrict = e.target.value;
      setFormData((prevData) => ({
        ...prevData,
        district: selectedDistrict,
        address: {
          ...prevData.address,
          city: '', // Reset city when district changes
        },
      }));
  
      try {
        const response = await axios.get(`/districts/${selectedDistrict}/cities`);
        cities(response.data.cities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
  
    
  const handleImageChange = (e) => {
    setShopImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`/shops/${id}`, formData, config);
      alert('Shop details updated successfully');
      navigate(`/shop/${id}`)
    } catch (error) {
      console.error('Error updating shop details:', error);
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
        navigate('/myshops'); // Redirect to shops list page
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

      <div className="flex-1 p-8 pt-16">
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
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-left">Category</label>
                <select
                    name="category"
                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled hidden>Select Category</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Spices">Spices</option>
                  </select>
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
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
        <form onSubmit={handleSubmit} className="bg-white p-6 pl-8 rounded-lg shadow-md w-2/3 mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
              <label className="block text-gray-700 text-left">District</label>
              <select
                name="district"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value={formData.district}
                onChange={(e) => {
                  DistrictChange(e);
                  handleChange(e);
                }}
              >
                <option value="" disabled hidden>Select District</option>
                {districts.map((district, index) => (
                  <option key={index} value={district.name}>{district.name}</option>
                ))}
              </select>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
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
            <div>
              <label className="block text-gray-700 text-left">City</label>
              <select
                name="city"
                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                value={formData.address.city}
                onChange={(e) => {
                  handleChange(e);
                  handleCityChange(e);
                }}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
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
