import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const OtpEntry = () => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate() // To programmatically navigate after OTP verification
    const VERIFY_OTP_URL = `/api/help/auth/verify-email`

    const handleChange = (e) => {
        setOtp(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(VERIFY_OTP_URL, {
                // Updated here
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: otp }),
            })

            const data = await response.json()

            if (response.ok) {
                // Navigate to the dashboard if OTP verification is successful
                navigate('/help/dashboard')
            } else {
                // Handle errors, e.g., show an error message
                alert(data.message || 'Failed to verify OTP. Please try again.')
            }
        } catch (error) {
            console.error('Error verifying OTP:', error)
            alert('An error occurred. Please try again.')
        }
    }

    return (
        <div className="p-8 my-[10rem] bg-white rounded max-w-xl mx-auto">
            <h1 className="mb-5 text-4xl font-bold text-center">Enter OTP</h1>
            <p className="mb-5 text-center">
                Please enter the OTP sent to your registered email.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="otp" className="block mb-2">
                        OTP
                    </label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter OTP"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#99dd05] text-black rounded p-2 hover:bg-[#5a9100] transition"
                >
                    Verify OTP
                </button>
            </form>
            <div className="mt-4 text-center">
                <p>
                    Didn&apos;t receive an OTP?{' '}
                    <Link
                        to="/resend-otp"
                        className="text-[#75b100] font-semibold"
                    >
                        Resend OTP
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default OtpEntry
