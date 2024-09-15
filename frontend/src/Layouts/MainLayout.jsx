import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import { Toaster } from 'react-hot-toast'

function MainLayout() {
    return (
        <>
            <Toaster position="top-center" />
            <NavBar />
            <Outlet />
        </>
    )
}

export default MainLayout
