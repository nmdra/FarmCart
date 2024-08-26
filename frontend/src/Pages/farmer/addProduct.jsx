import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/farmer/shop_sidebar';
import vege from '../../assets/vege.png';
import axios from '../../../axios';

const AddProduct = () => {
  const shopId = localStorage.getItem('shopId');  
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    name: '',
    pricePerKg: '',
    description: '',
  });
  const [productImage, setProductImage] = useState(null);
  const [errors, setErrors] = useState({
    name: '',
    pricePerKg: '',
  });

  // Handle form input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'name') {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(value)) {
        error = 'Product name can only contain letters and spaces.';
      }
    }

    if (name === 'pricePerKg') {
      const priceRegex = /^\d+(\.\d{1,2})?$/; // Validates a double value with up to two decimal places
      if (!priceRegex.test(value)) {
        error = 'Price per Kg must be a valid number with up to two decimal places.';
      }
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  // Handle image input change
  const handleImageChange = (e) => {
    setProductImage(URL.createObjectURL(e.target.files[0]));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.name || errors.pricePerKg) {
      alert('Please fix the validation errors before submitting.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post(`/shops/${shopId}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Product added successfully');
      navigate(`/shop/${shopId}/productpage`);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating product. Please try again.');
      console.error('Error creating product:', err);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate(`/shop/${shopId}/productpage`);
  };

  return (
    <div className="flex min-h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <div className="p-6 pt-16 pl-8 rounded-lg shadow-md">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Add Product Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 pl-8 rounded-lg shadow-md w-2/3 mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Product</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Form Fields */}
            <div className="md:col-span-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-left">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-left">Price per Kg</label>
                  <input
                    type="number"
                    name="pricePerKg"
                    step="0.01" // Allows decimal values
                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                    value={formData.pricePerKg}
                    onChange={handleChange}
                    required
                  />
                  {errors.pricePerKg && (
                    <p className="text-red-500 text-xs mt-1">{errors.pricePerKg}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 text-left">Description</label>
                  <textarea
                    name="description"
                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>


            {/* Image Upload */}
            <div className="flex flex-col items-center mt-12">
              <img
                className="w-48 h-32 object-cover border rounded-md"
                src={productImage || vege}
                alt="Product"
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

          {/* Buttons */}
          <div className="flex gap-x-5 mt-2">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-30"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-36"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
