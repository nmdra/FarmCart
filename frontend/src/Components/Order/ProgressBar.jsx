import React from 'react';

const ProgressBar = ({ currentStep }) => {
    const totalSteps = 3;  // Number of steps (e.g., Cart, Shipping, Payment)

    return (
        <div className="flex items-center justify-center mt-3 mb-0">
            {Array.from({ length: totalSteps }, (_, index) => (
                <div key={index} className="flex items-center">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors duration-300 ${
                            index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    >
                        {index + 1}
                    </div>
                    {index < totalSteps - 1 && (
                        <div
                            className={`w-12 h-1 mx-2 transition-colors duration-300 ${
                                index < currentStep - 1 ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
