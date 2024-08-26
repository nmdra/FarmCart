import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import verified from '../../assets/verified.gif'
import failed from '../../assets/failed.gif'
import farmcartLogo from '../../assets/logo.png'

const VerifyEmail = () => {
    const navigate = useNavigate()
    const [status, setStatus] = useState({ success: null, message: '' })
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get('token')

    const handleResendEmail = () => {
        // Handle email resend logic here
        console.log('Resend email clicked')
    }

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const { data } = await axios.get(
                    `/api/users/verify?token=${token}`
                )
                if (data.success) {
                    setStatus({
                        success: true,
                    })
                    setTimeout(() => {
                        navigate('/login')
                    }, 10000) // Redirect after 10 seconds
                }
            } catch (error) {
                setStatus({
                    success: false,
                })
            }
        }
        // setStatus({
        //     success: false,
        // })
        verifyEmail()
    }, [navigate, token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full border-2 border-lime-600">
                <img
                    src={farmcartLogo} // Replace with the path to your logo image
                    alt="Logo"
                    className="h-5 w-auto mb-2" // Adjust the height as needed
                />

                {status.success === true ? (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="bg-lime-600 p-1 rounded-full">
                                <img
                                    src={verified}
                                    alt="Email Verification"
                                    className="w-24 h-24 rounded-full"
                                />
                            </div>
                        </div>
                        <h1 className="text-2xl font-semibold text-lime-600">
                            Email Verified Successfully!
                        </h1>
                        <p className="mt-4 text-gray-600">
                            You will be redirected to the login page shortly.
                        </p>
                        <a
                            href="/login"
                            className="flex items-center text-lg justify-center px-6 py-2 bg-transparent text-green-800 hover:underline mt-4"
                        >
                            Login Here
                            <svg
                                className="ml-2 w-6 h-6"
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
                    </>
                ) : status.success === false ? (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="bg-red-600 p-1 rounded-full">
                                <img
                                    src={failed}
                                    alt="Email Verification"
                                    className="w-24 h-24 rounded-full"
                                />
                            </div>
                        </div>
                        <h1 className="text-2xl font-semibold text-red-600">
                            Email verification Failed.
                        </h1>
                        <p className="mt-4 text-gray-600">Please try again.</p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                            <button
                                onClick={handleResendEmail}
                                className="px-6 py-2 bg-red-400 text-black rounded-lg hover:bg-red-600"
                            >
                                Resend email
                            </button>
                            <a
                                href="/register"
                                className="flex items-center text-lg justify-center px-6 py-2 bg-transparent text-red-800 hover:underline"
                            >
                                Register Again
                                <svg
                                    className="ml-2 w-6 h-6"
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
                    </>
                ) : (
                    <h1 className="text-2xl font-semibold text-lime-600">
                        Verifying Email...
                    </h1>
                )}
            </div>
        </div>
    )
}

export default VerifyEmail
