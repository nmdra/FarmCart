import React from 'react'
import { FaShoppingCart, FaShippingFast, FaCheckCircle } from 'react-icons/fa'

const ProgressBar = ({ currentStep }) => {
    const totalSteps = 3

    const icons = [
        <FaShoppingCart key="cart" />,
        <FaShippingFast key="shipping" />,
        <FaCheckCircle key="done" />,
    ]

    return (
        <div className="flex items-center justify-center mt-3 mb-0 ">
            {Array.from({ length: totalSteps }, (_, index) => (
                <div key={index} className="flex items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-lg transition-colors duration-300 ${
                            index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    >
                        {icons[index]}
                    </div>
                    {index < totalSteps - 1 && (
                        <div
                            className={`w-10 h-1 mx-1.5 transition-colors duration-300 ${
                                index < currentStep - 1
                                    ? 'bg-green-600'
                                    : 'bg-gray-300'
                            }`}
                        />
                    )}
                </div>
            ))}
        </div>
    )
}

export default ProgressBar
