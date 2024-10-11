import { Navigate, Outlet } from 'react-router-dom'

const StaffPrivateRoute = () => {
    // Check if user is authenticated (e.g., by checking for a token in local storage)
    const staff = localStorage.getItem('staffToken') // Replace with your actual logic

    // Log the user state for debugging
    console.log(staff)

    return staff ? <Outlet /> : <Navigate to="/Admin" replace />
}

export default StaffPrivateRoute
