
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminCreateStaffPage = () => {
  const location = useLocation();
  const editMode = location.state?.editMode || false; // Fallback to false if not editing
  const staffToEdit = location.state?.staffToEdit || {};

  const [formData, setFormData] = useState(
    editMode
      ? {
          nic: staffToEdit.nic,
          name: staffToEdit.name,
          birthday: staffToEdit.birthday.split('T')[0],
          email: staffToEdit.email,
          phone: staffToEdit.phone,
          address: staffToEdit.address,
        }
      : {
          nic: '',
          name: '',
          birthday: '',
          email: '',
          phone: '',
          address: '',
        }
  );

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation for birthday: Ensure date is between 1980 and 2006
    if (name === 'birthday') {
      const minDate = new Date('1980-01-01');
      const maxDate = new Date('2006-12-31');
      const selectedDate = new Date(value);

      if (selectedDate < minDate || selectedDate > maxDate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          birthday: 'Date must be between 1980 and 2006',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, birthday: null }));
      }
    }

    // Update form data even if there are errors to let users correct input
    setFormData({ ...formData, [name]: value });
  };

  const handleNICKeyPress = (e) => {
    const allowedChars = /^[a-zA-Z0-9]*$/;
    if (!allowedChars.test(e.key)) {
      e.preventDefault(); // Prevent the keypress if it is not alphanumeric
    }
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
    if (errors.nic || errors.name || errors.phone || errors.email || errors.birthday) {
      console.error('Please fix the validation errors before submitting the form.');
      return;
    }

    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/api/staff/${staffToEdit._id}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/staff/Addstaff', formData);
      }
      navigate('/staff'); // Redirect to StaffPage after successful submission
    } catch (error) {
      console.error('Error submitting staff data:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Staff Member' : 'Add Staff Member'}</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block mb-2">NIC</label>
          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleInputChange}
            onKeyPress={handleNICKeyPress} // Restrict invalid characters in NIC field
            className="border p-2 w-full"
            required
            maxLength="12"
          />
          {errors.nic && <p className="text-red-500 text-sm">{errors.nic}</p>}
        </div>
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
  <label className="block mb-2">Birthday</label>
  <input
    type="date"
    name="birthday"
    value={formData.birthday}
    onChange={handleInputChange}
    className="border p-2 w-full"
    required
    min="1980-01-01" // Set the minimum allowed date
    max="2006-12-31" // Set the maximum allowed date
  />
  {errors.birthday && <p className="text-red-500 text-sm">{errors.birthday}</p>}
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
          {editMode ? 'Update Staff Member' : 'Create Staff Member'}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateStaffPage;
