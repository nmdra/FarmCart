import { Outlet } from 'react-router-dom'
import NavBar from '../Components/Help/NavBar'
import HelpFooter from '../Components/Help/HelpFooter'
import HelpChatIcon from '../Components/Help/HelpChatIcon'

function HelpLayout() {
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
        <div>
            <NavBar />
            <div>
                <Outlet />
                <div className="App">
                    <HelpChatIcon user={customer} />
                </div>
            </div>
            <HelpFooter />
        </div>
    )
}

export default HelpLayout
