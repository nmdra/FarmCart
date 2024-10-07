import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CustomerPage = () => {
    const [customers, setCustomers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchCustomers()
    }, [])

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/customer'
            )
            setCustomers(response.data)
        } catch (error) {
            console.error('Error fetching customers:', error)
        }
    }

    const handleEditClick = (customer) => {
        navigate('/customer/create', {
            state: { editMode: true, customerToEdit: customer },
        })
    }

    const handleDeleteClick = async (customerId) => {
        try {
            await axios.delete(
                `http://localhost:3000/api/customer/${customerId}`
            )
            fetchCustomers()
        } catch (error) {
            console.error('Error deleting customer:', error)
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Customers</h2>
            <button
                onClick={() => navigate('/Admindashboard/Customer/create')} // Navigate to Add Customer form
                className="bg-green-500 text-white px-3 py-1 rounded mb-4"
            >
                Add Customer
            </button>
            <table className="w-full bg-white shadow-md rounded mb-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers.map((customer) => (
                            <tr key={customer._id}>
                                <td className="p-3">{customer.name}</td>
                                <td className="p-3">{customer.email}</td>
                                <td className="p-3">{customer.phone}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() =>
                                            handleEditClick(customer)
                                        }
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteClick(customer._id)
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="p-3 text-center">
                                No customers found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerPage
