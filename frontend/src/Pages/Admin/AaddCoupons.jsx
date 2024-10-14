import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'
import Swal from 'sweetalert2'
import Sidebar from '../../Components/Admin/AsideBar'

const AddCoupon = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        couponCode: '',
        discount: '',
        expiryDate: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        couponCode: '',
        discount: '',
        expiryDate: '',
    });

    // Handle input change with validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = '';

        // Coupon Code validation: Ensure it's not empty
        if (name === 'couponCode' && value === '') {
            error = 'Coupon code cannot be empty';
        }

        // Discount validation: Must be a number and <= 100
        if (name === 'discount') {
            const discountValue = parseInt(value, 10);
            if (isNaN(discountValue) || discountValue < 0) {
                error = 'Discount must be a positive number';
            } else if (discountValue > 100) {
                error = 'Discount cannot be more than 100';
            }
        }
        // Expiry date validation: Must be today or a future date
        if (name === 'expiryDate') {
            const minDate = new Date('2024-10-15')
            const maxDate = new Date('2030-01-01')
            const selectedDate = new Date(value)
            if (selectedDate < minDate || selectedDate > maxDate) {
                error = 'Birthday must be between today and upcoming'
            }
        }

        // Update form data and errors
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: error });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if any validation errors exist
        if (Object.values(errors).some((err) => err)) {
            Swal.fire('Validation Error', 'Please fix the errors', 'error');
            return;
        }

        try {
            setLoading(true);

            await axios.post('/coupon', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            Swal.fire('Success', 'Coupon created successfully', 'success');
            navigate('/coupons');
        } catch (err) {
            console.error('Error creating coupon:', err);
            Swal.fire(
                'Error',
                'Error creating coupon, please try again',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/coupons');
    };

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
                                {errors.couponCode && (
                                    <p className="text-red-500 text-xs">
                                        {errors.couponCode}
                                    </p>
                                )}
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
                                    onBlur={() => {
                                        if (parseInt(formData.discount, 10) > 100) {
                                            setFormData({ ...formData, discount: '100' });
                                        }
                                    }}
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
                                    min="2024-10-15"
                                     max="2030-10-15"
                                />
                                {errors.expiryDate && (
                                    <p className="text-red-500 text-xs">
                                        {errors.expiryDate}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Coupon'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCoupon;
