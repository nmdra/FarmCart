import { useState } from 'react'
import { Link } from 'react-router-dom'

const OtpForm = () => {
    const [otp, setOtp] = useState('')

    const handleChange = (e) => {
        setOtp(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle OTP submission logic here, e.g., verify OTP
        console.log('OTP submitted:', otp)
    }

    return (
        <div className="p-8 my-[10rem] bg-white rounded">
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
                    Didn’t receive an OTP?{' '}
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

export default OtpForm
