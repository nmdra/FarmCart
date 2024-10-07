import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' // Ensure this path is correct

const DLlogout = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        // Function to handle logout
        const handleLogout = async () => {
            try {
                const driverToken = localStorage.getItem('driverToken')
                if (!driverToken) {
                    navigate('/driver/login') // If no token, redirect to login page
                    return
                }

                await axios.post(
                    '/api/drivers/logout', // Adjust the API endpoint as needed
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${driverToken}`,
                        },
                    }
                )

                // Remove token from localStorage
                localStorage.removeItem('driverToken')

                // Redirect to the driver login page
                navigate('/driver/login')
                console.log('Successfully logged out')
            } catch (err) {
                console.error('Logout failed:', err)
                setError('Logout failed. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        handleLogout()
    }, [navigate])

    return (
        <div className="flex justify-center items-center h-screen">
            {loading ? (
                <p>Logging out...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <p>You have been logged out successfully.</p>
            )}
        </div>
    )
}

export default DLlogout
