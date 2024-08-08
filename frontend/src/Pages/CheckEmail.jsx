import { useNavigate } from 'react-router-dom'

const CheckEmail = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-semibold text-blue-600">
                    Registration Successful!
                </h1>
                <p className="mt-4 text-gray-600">
                    Please check your email to verify your account. A
                    verification link has been sent to your email address.
                </p>
                <p
                    className="mt-6 text-blue-500 underline cursor-pointer"
                    onClick={() => navigate('/login')}
                >
                    Click here to go to the login page.
                </p>
            </div>
        </div>
    )
}

export default CheckEmail
