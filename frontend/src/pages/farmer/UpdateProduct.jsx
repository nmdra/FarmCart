import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import Sidebar from '../../Components/farmer/shop_sidebar';
import vege from '../../assets/vege.png';
import axios from '../../../axios';

const UpdateProduct = () => {
  const  shopId = localStorage.getItem('shopId')  
  const productId = localStorage.getItem('productId')
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    pricePerKg: '',
    description: '',
  });
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState({
    name: '',
    pricePerKg: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`/shops/${shopId}/products/${productId}`, config);
        setFormData({
          name: data.name,
          pricePerKg: data.pricePerKg,
          description: data.description,
        });
        setProductImage(data.imageUrl || vege);
      } catch (error) {
        console.error('Error fetching Product details:', error);
      }
    };

    fetchProduct();
  }, [shopId, productId]); // Depend on both shopId and productId

  const validateName = (name) => {
    return /^[A-Za-z\s]+$/.test(name); // Only letters and at least 3 characters long
  };

  const validateprice = (pricePerKg) => {
    return /^\d+(\.\d{1,2})?$/.test(pricePerKg); // Validates a double value with up to two decimal places
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    let error = "";
    switch (name) {
      case 'name':
        error = validateName(value) ? '' : 'Name must contain only letters and spaces';
        break;
      case 'pricePerKg':
        error = validateprice(value) ? '' : 'please enter valid price.';
        break;
      default:  
    }
    setFormData({ ...formData, [name]: value });
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Handle image input change
  const handleImageChange = (e) => {
    setProductImage(URL.createObjectURL(e.target.files[0]));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(error).some((error) => error)) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.put(`/shops/${shopId}/products/${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Product updated successfully');
      navigate(`/shop/${shopId}/productpage`);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating product. Please try again.');
      console.error('Error updating product:', err);
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
        {/* Update Product Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 pl-8 rounded-lg shadow-md w-2/3 mb-12">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Product</h3>

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
                  {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-left">Price per Kg</label>
                  <input
                    type="number"
                    name="pricePerKg"
                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                    value={formData.pricePerKg}
                    onChange={handleChange}
                    required
                  />
                  {error.pricePerKg && <p className="text-red-500 text-sm">{error.pricePerKg}</p>}
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
                src={productImage || vege} // Display uploaded image or placeholder
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
              Update Product
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

export default UpdateProduct;
