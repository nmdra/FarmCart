import { Outlet } from 'react-router-dom'
import CategoryBar from '../Components/Home/CategoryBar'
import Footer from '../Components/Home/FooterDashboard'
import Header from '../Components/Home/Header'

function MainLayout() {
    return (
        <>
            <div className="sticky top-0 bg-white shadow-md bg-opacity-70 backdrop-blur-md z-50">
                {/* <NewsBar /> */}
                <Header />
                <CategoryBar />
            </div>
            <Outlet />
            <div className="sticky top-0 bg-white shadow-md bg-opacity-70 backdrop-blur-md z-50">
                <Footer />
            </div>
        </>
    )
}

export default MainLayout
