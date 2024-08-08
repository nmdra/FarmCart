import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const register = async (name, email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post('/api/users', {
                name,
                email,
                password,
            })

            const json = response.data
            console.log(json)

            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'REGISTER', payload: json })

            setIsLoading(false)
            navigate('/profile')
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

    return { error, isLoading, register }
}
