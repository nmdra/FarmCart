import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'
import Swal from 'sweetalert2'
import Sidebar from '../../Components/Admin/AsideBar'

const AddCoupon = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        couponCode: '',
        discount: '',
        expiryDate: '',
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        couponCode: '',
        discount: '',
        expiryDate: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        // Simple validation for discount (should be a number)
        if (name === 'discount') {
            const discountRegex = /^\d+$/ // Accept only digits
            setErrors({
                ...errors,
                discount: !discountRegex.test(value)
                    ? 'Discount must be a number'
                    : '',
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (errors.discount) {
            Swal.fire('Validation Error', 'Please fix the errors', 'error')
            return
        }

        try {
            setLoading(true)

            await axios.post('/coupon', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            Swal.fire('Success', 'Coupon created successfully', 'success')
            navigate('/coupons') // Redirect to coupons page after creation
        } catch (err) {
            console.error('Error creating coupon:', err)
            Swal.fire(
                'Error',
                'Error creating coupon, please try again',
                'error'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        navigate('/coupons') // Navigate back to coupons page
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-24 mt-16">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-32 ml-64 overflow-y-auto">
                {/* Add Coupon Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-12 pl-6 rounded-lg shadow-md w-full"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Add Coupon
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
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
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    Discount
                                </label>
                                <input
                                    type="text"
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
                            <div>
                                <label className="block text-gray-700">
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-x-5 mt-4">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Coupon'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCoupon
