import React from 'react'
import { HiOutlineCheckCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

const PaymentComplete = () => {
    const navigate = useNavigate()

    const handleGoToDashboard = () => {
        navigate('/userDashboard') // Adjust this path according to your routes
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center border-2 border-green-500">
                <HiOutlineCheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                    Payment Successful!
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                    Your membership upgrade has been completed successfully.
                    Thank you for your purchase!
                </p>
                <button
                    onClick={handleGoToDashboard}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    )
}

export default PaymentComplete
