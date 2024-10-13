import { Outlet } from 'react-router-dom'
import NavBar from '../Components/Help/NavBar'
import HelpFooter from '../Components/Help/HelpFooter'

function HelpLayout() {
    return (
        <div>
            <NavBar />
            <div>
                <Outlet />
            </div>
            <HelpFooter />
        </div>
    )
}

export default HelpLayout
