import React from 'react'
import emailGif from '../../assets/email.gif'
import farmcartLogo from '../../assets/logo.png'

const CheckEmail = () => {
    const handleResendEmail = () => {
        // Handle email resend logic here
        console.log('Resend email clicked')
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center border-2 border-green-600">
                <img
                    src={farmcartLogo} // Replace with the path to your logo image
                    alt="Logo"
                    className="h-5 w-auto mb-2" // Adjust the height as needed
                />
                <div className="flex justify-center mb-6">
                    <div className="bg-lime-600 p-1 rounded-full">
                        <img
                            src={emailGif}
                            alt="Email Verification"
                            className="w-24 h-24 rounded-full"
                        />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">
                    Verify your email address
                </h2>
                <p className="text-gray-700 mb-4">
                    We have sent a verification link to your Email.
                </p>
                <p className="text-gray-700 mb-6">
                    Click on the link to complete the verification process. You
                    might need to{' '}
                    <span className="font-medium">check your spam folder</span>.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={handleResendEmail}
                        className="px-6 py-2 bg-lime-500 text-black rounded-lg hover:bg-lime-600"
                    >
                        Resend email
                    </button>
                    <a
                        href="/"
                        className="flex items-center justify-center px-6 py-2 bg-transparent text-green-800 hover:underline"
                    >
                        Visit Store
                        <svg
                            className="ml-2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            ></path>
                        </svg>
                    </a>
                </div>
                <p className="text-gray-500 mt-6 text-sm">
                    You can reach us at if you have any questions.
                </p>
            </div>
        </div>
    )
}

export default CheckEmail
