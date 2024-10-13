import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DistrictsData from '../lib/DistrictData'
import toast from 'react-hot-toast'

const Address = () => {
    const [formData, setFormData] = useState({
        defaultAddress: {
            streetAddress: '',
            district: '',
            city: '',
            zipCode: '', // Use "postalCode" to match the field name in your MongoDB schema
        },
    })
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (user && user.defaultAddress) {
            setFormData({
                defaultAddress: {
                    streetAddress: user.defaultAddress.streetAddress || '',
                    district: user.defaultAddress.district || '',
                    city: user.defaultAddress.city || '',
                    zipCode: user.defaultAddress.zipCode || '', // Use "postalCode" if needed
                },
            })
        }
    }, [])

    const [cities, setCities] = useState([])

    useEffect(() => {
        if (formData.defaultAddress.district) {
            setCities(DistrictsData[formData.defaultAddress.district] || [])
        }
    }, [formData.defaultAddress.district])

    const handleInputChange = (e) => {
        const { name, value } = e.target

        // Update the nested defaultAddress object
        setFormData((prev) => ({
            ...prev,
            defaultAddress: {
                ...prev.defaultAddress,
                [name]: value,
            },
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(formData)

        try {
            const response = await axios.put('/api/users', formData)
            console.log(response)
            // alert('User updated successfully')
            toast.success('Account updated successfully')

            const json = response.data.user
            console.log('Update successful:', json)

            // Save updated user details to localStorage
            localStorage.setItem('user', JSON.stringify(json))
        } catch (error) {
            console.error('Error updating user:', error)
            // alert('Failed to update user')
            toast.error('Failed to update account details')
        }
    }

    return (
        <div className="max-w-full mx-8 my-6 p-6 bg-white rounded-lg shadow-md border-2 border-green-600">
            <h2 className="text-2xl font-semibold mb-4">Billing Address</h2>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Street Address
                    </label>
                    <input
                        type="text"
                        name="streetAddress"
                        value={formData.defaultAddress.streetAddress}
                        onChange={handleInputChange}
                        className="block w-full px-4 py-2 border rounded-md"
                        placeholder="Street Address"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            District
                        </label>
                        <select
                            name="district"
                            value={formData.defaultAddress.district}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-md"
                            required
                        >
                            <option value="">Choose District</option>
                            {Object.keys(DistrictsData).map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            City
                        </label>
                        <select
                            name="city"
                            value={formData.defaultAddress.city}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-md"
                            required
                        >
                            <option value="">Choose City</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Zip Code
                        </label>
                        <input
                            type="number"
                            name="zipCode"
                            value={formData.defaultAddress.zipCode}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-md"
                            placeholder="Zip Code"
                            min="10000" // Minimum value
                            max="99999" // Maximum value
                            required
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Address
