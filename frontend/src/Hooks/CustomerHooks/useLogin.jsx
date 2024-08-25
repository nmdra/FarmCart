import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post('/api/users/auth', {
                email,
                password,
            })

            const json = response.data
            console.log(json)

            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)
            navigate('/userDashboard')
        } catch (error) {
            console.error(error)
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message)
            } else {
                setError('Internal server error. Please try again later.')
            }
            setIsLoading(false)
        }
    }

    return { error, isLoading, login }
}

// TODO: Refactor using userReducer Hook
// Redirect current page
