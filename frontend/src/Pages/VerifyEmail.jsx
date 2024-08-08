import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const VerifyEmail = () => {
    const navigate = useNavigate()
    const [status, setStatus] = useState({ success: null, message: '' })
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get('token')

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const { data } = await axios.get(
                    `/api/users/verify?token=${token}`
                )
                if (data.success) {
                    setStatus({
                        success: true,
                        message: 'Email Verified Successfully!',
                    })
                    setTimeout(() => {
                        navigate('/login')
                    }, 10000) // Redirect after 10 seconds
                }
            } catch (error) {
                setStatus({
                    success: false,
                    message:
                        error.response?.data?.message ||
                        'Email verification failed. Please try again later.',
                })
            }
        }

        verifyEmail()
    }, [navigate, token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                {status.success === true ? (
                    <>
                        <h1 className="text-2xl font-semibold text-green-600">
                            {status.message}
                        </h1>
                        <p className="mt-4 text-gray-600">
                            You will be redirected to the login page shortly.
                        </p>
                    </>
                ) : status.success === false ? (
                    <>
                        <h1 className="text-2xl font-semibold text-red-600">
                            Verification Failed
                        </h1>
                        <p className="mt-4 text-gray-600">{status.message}</p>
                    </>
                ) : (
                    <h1 className="text-2xl font-semibold text-blue-600">
                        Verifying Email...
                    </h1>
                )}
                <p
                    className="mt-2 text-blue-500 underline cursor-pointer"
                    onClick={() => navigate('/login')}
                >
                    Click here to go to the login page.
                </p>
            </div>
        </div>
    )
}

export default VerifyEmail
