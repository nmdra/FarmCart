import React, { useState } from 'react'
import axios from 'axios'

const AddPromotionPage = () => {
    const [formData, setFormData] = useState({
        productId: '',
        name: '',
        originalPrice: '',
        discountPercentage: '',
        discountedPrice: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Calculate the discounted price based on the original price and discount percentage
            const discountedPrice = (
                formData.originalPrice -
                (formData.originalPrice * formData.discountPercentage) / 100
            ).toFixed(2)

            // Update the formData with the calculated discounted price
            const updatedFormData = { ...formData, discountedPrice }

            const response = await axios.post(
                '/api/Promotion/promotions',
                updatedFormData
            )
            console.log('Promotion added:', response.data)

            // Clear the form after submission
            setFormData({
                productId: '',
                name: '',
                originalPrice: '',
                discountPercentage: '',
                discountedPrice: '',
            })
        } catch (error) {
            console.error('There was an error adding the promotion:', error)
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Add New Promotion</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Product ID</label>
                    <input
                        type="text"
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <label>Original Price</label>
                    <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <label>Discount Percentage</label>
                    <input
                        type="number"
                        name="discountPercentage"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                        required
                        className="p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-lime-600 text-black p-2 rounded-md"
                >
                    Add Promotion
                </button>
            </form>
        </div>
    )
}

export default AddPromotionPage
