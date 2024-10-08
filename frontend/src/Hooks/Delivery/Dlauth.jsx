import { useContext, createContext, useState, useEffect } from 'react'
import axios from 'axios'

// Create Auth context
const DriverAuthContext = createContext()

export const useDriverAuth = () => {
    return useContext(DriverAuthContext)
}

// Provide Auth Context to the whole app
export const DriverAuthProvider = ({ children }) => {
    const [driverToken, setDriverToken] = useState(
        localStorage.getItem('driverToken')
    )
    const [driver, setDriver] = useState(null)

    useEffect(() => {
        // Fetch driver profile if there's a token
        if (driverToken) {
            const fetchDriver = async () => {
                try {
                    const { data } = await axios.get('/api/drivers/profile', {
                        headers: { Authorization: `Bearer ${driverToken}` },
                    })
                    setDriver(data)
                } catch (error) {
                    console.error('Failed to fetch driver profile')
                }
            }
            fetchDriver()
        }
    }, [driverToken])

    const logout = () => {
        setDriverToken(null)
        setDriver(null)
        localStorage.removeItem('driverToken')
        axios.post('/api/drivers/logout') // Clear session on the server
    }

    const value = {
        driver,
        driverToken,
        setDriverToken: (token) => {
            setDriverToken(token)
            localStorage.setItem('driverToken', token)
        },
        logout,
    }

    return (
        <DriverAuthContext.Provider value={value}>
            {children}
        </DriverAuthContext.Provider>
    )
}
