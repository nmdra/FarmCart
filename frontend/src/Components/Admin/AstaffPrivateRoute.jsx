import { Navigate, Outlet } from 'react-router-dom'

const StaffPrivateRoute = ({ manager }) => {
    // Destructure manager from props
    // Check if the user is authenticated by checking for a token in local storage
    const staff = localStorage.getItem('staffToken') // Replace with your actual logic

    // Log the user state for debugging
    console.log(staff)

    // If staff token exists and manager prop is true, redirect to /manager
    if (manager) {
        return staff ? <Outlet /> : <Navigate to="/manager" replace />
    }

    // If staff token exists, render the Outlet, otherwise navigate to /Admin
    return staff ? <Outlet /> : <Navigate to="/Admin" replace />
}

export default StaffPrivateRoute
