import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/staff');
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const handleEditClick = (staffMember) => {
    navigate('/staff/create', { state: { editMode: true, staffToEdit: staffMember } });
  };

  const handleDeleteClick = async (staffId) => {
    try {
      await axios.delete(`http://localhost:3000/api/staff/${staffId}`);
      fetchStaff();
    } catch (error) {
      console.error('Error deleting staff member:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Staff Members</h2>
      <button
        onClick={() => navigate('/staff/create')} // Navigate to Add Staff form
        className="bg-green-500 text-white px-3 py-1 rounded mb-4"
      >
        Add Staff
      </button>
      <table className="w-full bg-white shadow-md rounded mb-4 border-2 border-lime-500">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">NIC</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Birthday</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.length > 0 ? (
            staff.map((staffMember) => (
              <tr key={staffMember._id} className="border-t border-lime-500">
                <td className="p-3">{staffMember.nic}</td>
                <td className="p-3">{staffMember.name}</td>
                <td className="p-3">{staffMember.email}</td>
                <td className="p-3">{staffMember.birthday}</td>
                <td className="p-3">{staffMember.phone}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEditClick(staffMember)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(staffMember._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-3 text-center">No staff members found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StaffPage;
