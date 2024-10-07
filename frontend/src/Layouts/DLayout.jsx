import { Outlet } from 'react-router-dom'
import CategoryBar from '../Components/Home/CategoryBar'
import Footer from '../Components/Home/Footer'
import DHeader from '../Components/Home/DHeader'

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
