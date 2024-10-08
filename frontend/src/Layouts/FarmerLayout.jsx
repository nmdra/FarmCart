import { Outlet } from 'react-router-dom'
import Footer from '../Components/Home/FooterDashboard'
import Header from '../Components/farmer/Header'

function FarmerLayout() {
    return (
        <>
            <div className="sticky top-0 bg-white shadow-md bg-opacity-70 backdrop-blur-md z-50">
                <Header />
                <div className="h-1 bg-custom-green" />
            </div>

            <Outlet />
            <div className="sticky top-0 bg-white shadow-md bg-opacity-70 backdrop-blur-md z-50">
                <Footer />
            </div>
        </>
    )
}

export default FarmerLayout
