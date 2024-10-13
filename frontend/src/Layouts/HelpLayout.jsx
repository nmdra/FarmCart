import { Outlet } from 'react-router-dom'
import NavBar from '../Components/Help/NavBar'
import HelpFooter from '../Components/Help/HelpFooter'
import HelpChatIcon from '../Components/Help/HelpChatIcon'

function HelpLayout() {
    const user = {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: '2024-01-01T12:34:56.000Z',
    }
    return (
        <div>
            <NavBar />
            <div>
                <Outlet />
                <div className="App">
                    <HelpChatIcon user={user} />
                </div>
            </div>
            <HelpFooter />
        </div>
    )
}

export default HelpLayout
