import { AuthContext } from '../Context/AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error(
            'useAuthContext must be used within an AuthContextProvider'
        )
    }

    return context
}
