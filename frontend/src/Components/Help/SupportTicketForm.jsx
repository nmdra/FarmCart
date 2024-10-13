import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SupportTicketForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        priorityLevel: '',
        category: '',
        description: '',
    })

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target

        // Check if the input is for the phone number and limit to 10 digits
        if (name === 'phone') {
            if (value.length <= 10 && /^[0-9]*$/.test(value)) {
                setFormData({ ...formData, [name]: value })
            }
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[0-9]{10}$/ // Ensures exactly 10 digits
        return phoneRegex.test(phone)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate the phone number
        if (!validatePhoneNumber(formData.phone)) {
            toast.error('Please enter a valid 10-digit phone number.')
            return
        }

        try {
            // Send form data to your backend API using the environment variable
            const response = await axios.post(
                `/api/help/support-tickets`,
                formData
            )
            console.log('Ticket submitted successfully:', response.data)

            // Show success toast
            toast.success('Ticket submitted successfully!')

            // Optionally, reset the form after successful submission
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                priorityLevel: '',
                category: '',
                description: '',
            })
        } catch (error) {
            console.error('Error submitting ticket:', error)
            // Show error toast
            toast.error('Error submitting ticket. Please try again.')
        }
    }

    return (
        <div className="p-6 mx-auto mt-10 bg-white shadow-sm max-w-7xl rounded-xl">
            {/* Toast container for notifications */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
            />

            <form onSubmit={handleSubmit} className="p-10">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center w-full gap-x-3">
                    <div className="w-full mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="w-full mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Phone No:
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            maxLength={10} // Limit input to 10 characters
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Subject:
                    </label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center w-full gap-x-3">
                    <div className="w-full mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Priority Level:
                        </label>
                        <select
                            name="priorityLevel"
                            value={formData.priorityLevel}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="w-full mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Category:
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select category</option>
                            <option value="technical">Technical</option>
                            <option value="billing">Billing</option>
                            <option value="general">General</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Description:
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={20}
                        className="block w-full h-32 p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 font-semibold text-[#1e3201] hover:text-white bg-[#b8f724] rounded-md hover:bg-[#1e3201] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SupportTicketForm
