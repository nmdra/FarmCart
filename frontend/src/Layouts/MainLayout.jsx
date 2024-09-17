import { Outlet } from 'react-router-dom'
import CategoryBar from "../Components/Home/CategoryBar";
import Footer from "../Components/Home/Footer";
import Header from "../Components/Home/Header";
import NewsBar from "../Components/Home/NewsBar";
// import CTABar from "./Components/CTABar";
// import Hero from "./Components/Hero";
// import ProcessCTA from "./Components/ProcessCTA";
// import ShopList from "./Components/ShopList";
// import Testimonials from "./Components/Testimonials";
// import NavBar from '../Components/NavBar'

function MainLayout() {
    return (
        <>
      <div className="sticky top-0 bg-white shadow-md bg-opacity-70 backdrop-blur-md z-50">
        {/* <NewsBar /> */}
        <Header />
        <CategoryBar />
      </div>
            <Outlet />
                  <div>
        <Footer />
      </div>
        </>
    )
}

export default MainLayout
