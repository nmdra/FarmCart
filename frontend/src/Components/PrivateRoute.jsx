import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../Hooks/CustomerHooks/useAuthContext'

const PrivateRoute = () => {
    const { user } = useAuthContext()

    console.log(user)
    return user ? <Outlet /> : <Navigate to="/login" replace />
}
export default PrivateRoute
