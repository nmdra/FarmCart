import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import Swal from 'sweetalert2'
import Sidebar from '../../Components/Admin/AsideBar'

const UpdateCoupon = () => {
    const navigate = useNavigate()
    const { id } = useParams() // Get the coupon ID from the URL
    const [formData, setFormData] = useState({
        couponCode: '',
        discount: '',
        expiryDate: '',
    })
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({
        couponCode: '',
        discount: '',
        expiryDate: '',
    })

    // Fetch coupon details
    useEffect(() => {
        const fetchCouponDetails = async () => {
            try {
                const { data } = await axios.get(`/coupon/${id}`)
                setFormData(data)
            } catch (err) {
                console.error('Error fetching coupon details:', err)
                Swal.fire('Error', 'Error fetching coupon details', 'error')
            } finally {
                setLoading(false)
            }
        }

        fetchCouponDetails()
    }, [id])

    // Helper for validation
    const validateField = (name, value) => {
        let error = ''

        if (name === 'couponCode') {
            if (value.trim() === '') {
                error = 'Coupon code is required'
            }
        }

        if (name === 'discount') {
            const discountValue = parseFloat(value)
            if (
                isNaN(discountValue) ||
                discountValue <= 0 ||
                discountValue > 100
            ) {
                error = 'Discount must be a number between 1 and 100'
            }
        }

        if (name === 'expiryDate') {
            const currentDate = new Date()
            const selectedDate = new Date(value)
            if (selectedDate <= currentDate) {
                error = 'Expiry date must be in the future'
            }
        }

        return error
    }

    // Handle input change with validation
    const handleChange = (e) => {
        const { name, value } = e.target
        const error = validateField(name, value)

        setFormData({ ...formData, [name]: value })
        setErrors({ ...errors, [name]: error })
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.values(errors).some((err) => err)) {
            Swal.fire('Validation Error', 'Please fix the errors', 'error')
            return
        }

        try {
            await axios.put(`/coupon/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            Swal.fire('Success', 'Coupon updated successfully', 'success')
            navigate('/coupons')
        } catch (err) {
            console.error('Error updating coupon:', err)
            Swal.fire(
                'Error',
                'Error updating coupon, please try again',
                'error'
            )
        }
    }

    const handleCancel = () => {
        navigate('/coupons')
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-24 mt-16">
                <Sidebar />
            </aside>

            <div className="flex-1 p-32 ml-64 overflow-y-auto">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-12 pl-6 rounded-lg shadow-md w-full"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Update Coupon
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700">
                                    Coupon Code
                                </label>
                                <input
                                    type="text"
                                    name="couponCode"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={formData.couponCode}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.couponCode && (
                                    <p className="text-red-500 text-xs">
                                        {errors.couponCode}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    Discount (%)
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.discount && (
                                    <p className="text-red-500 text-xs">
                                        {errors.discount}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                />
                                {errors.expiryDate && (
                                    <p className="text-red-500 text-xs">
                                        {errors.expiryDate}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 mt-8">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCoupon
