import { Outlet } from 'react-router-dom'
// import Footer from '../Components/Home/Footer'
import Footer from '../Components/Home/FooterDashboard'
import DHeader from '../Components/delivery/DHeader'

function DLayout() {
    return (
        <>
            <div className="sticky top-0 bg-white shadow-md bg-opacity-70 backdrop-blur-md z-50">
                <div className="h-1 bg-custom-green" />

                {/* <NewsBar /> */}
                <DHeader />
                <div className="h-1 bg-custom-green" />
            </div>
            <Outlet />
            <div className="sticky top-0 bg-white shadow-md bg-opacity-70 backdrop-blur-md z-50">
                <Footer />
            </div>
        </>
    )
}

export default DLayout
