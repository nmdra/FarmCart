import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminCreateCustomerPage = () => {
  const location = useLocation();
  const editMode = location.state?.editMode || false; // Fallback to false if not editing
  const customerToEdit = location.state?.customerToEdit || {};

  const [formData, setFormData] = useState(
    editMode
      ? {
          name: customerToEdit.name,
          email: customerToEdit.email,
          phone: customerToEdit.phone,
          address: customerToEdit.address,
        }
      : {
          name: '',
          email: '',
          phone: '',
          address: '',
        }
  );

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data even if there are errors to let users correct input
    setFormData({ ...formData, [name]: value });
  };

  const handleNameKeyPress = (e) => {
    const allowedChars = /^[a-zA-Z\s]*$/;
    if (!allowedChars.test(e.key)) {
      e.preventDefault(); // Prevent the keypress if it is not a letter or space
    }
  };

  const handlePhoneKeyPress = (e) => {
    const allowedChars = /^[0-9]*$/;
    if (!allowedChars.test(e.key)) {
      e.preventDefault(); // Prevent the keypress if it is not a number
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors before submitting
    if (errors.name || errors.phone || errors.email) {
      console.error('Please fix the validation errors before submitting the form.');
      return;
    }

    try {
      if (editMode) {
        await axios.put(`/api/customer/${customerToEdit._id}`, formData);
      } else {
        await axios.post('/api/customer/AddCustomer', formData);
      }
      navigate('/customer'); // Redirect to CustomerPage after successful submission
    } catch (error) {
      console.error('Error submitting customer data:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Customer' : 'Add Customer'}</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onKeyPress={handleNameKeyPress} // Restrict invalid characters in Name field
            className="border p-2 w-full"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onKeyPress={handlePhoneKeyPress} // Restrict invalid characters in Phone field
            className="border p-2 w-full"
            required
            maxLength="10"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button type="submit" className="bg-lime-600 text-black p-2 rounded-md">
          {editMode ? 'Update Customer' : 'Create Customer'}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateCustomerPage;
