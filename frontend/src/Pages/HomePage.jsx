import { useEffect } from 'react'
import CTABar from '../Components/Home/CTABar'
import Hero from '../Components/Home/Hero'
import ProcessCTA from '../Components/Home/ProcessCTA'
import ShopList from '../Components/Home/ShopList'
import Testimonials from '../Components/Home/Testimonials'
import Footer from '../Components/Home/Footer'

const Homepage = () => {
    useEffect(() => {
        document.title = 'FarmCart : Home'
    }, [])
    return (
        <>
            <Hero />
            <CTABar />
            <ProcessCTA />
            <ShopList />
            <Testimonials />
            <Footer />
        </>
    )
}

export default Homepage
