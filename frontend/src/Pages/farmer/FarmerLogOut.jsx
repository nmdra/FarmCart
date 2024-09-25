import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios' // Ensure this path is correct

const Logout = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        // Function to handle logout
        const handleLogout = async () => {
            try {
                const out = await axios.post(
                    '/farmers/logout',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                )
                // Remove token from local storage
                localStorage.removeItem('token')
                // Redirect to the login page
                navigate('/farmerlogin')
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

    return <div></div>
}

export default Logout
