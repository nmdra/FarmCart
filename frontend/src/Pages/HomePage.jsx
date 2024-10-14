import { useEffect } from 'react'
import CTABar from '../Components/Home/CTABar'
import Hero from '../Components/Home/Hero'
import ProcessCTA from '../Components/Home/ProcessCTA'
import ShopList from '../Components/Home/ShopList'
import Testimonials from '../Components/Home/Testimonials'
import Footer from '../Components/Home/Footer'
import HelpChatIcon from '../Components/Help/HelpChatIcon'

const Homepage = () => {
    useEffect(() => {
        document.title = 'FarmCart : Home'
    }, [])

    const user = JSON.parse(localStorage.getItem('user'))

    // Handle the case where user is null or undefined
    const customer = user
        ? {
              id: user._id,
              name: user.firstname,
              email: user.email,
              createdAt: Date.now(),
          }
        : {
              id: '01JA3JDNTD35GP144D83PPJVR6',
              name: 'Guest',
              email: 'guest@example.com',
              createdAt: Date.now(),
          }

    return (
        <>
            <HelpChatIcon user={customer} />
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
