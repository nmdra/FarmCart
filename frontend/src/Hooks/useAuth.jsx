import { useState, useEffect } from 'react'

// Example of a simple authentication check
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // Fetch the authentication status from localStorage or context
        const token = localStorage.getItem('token')
        setIsAuthenticated(!!token) // Set true if token exists
    }, [])

    return { isAuthenticated }
}
