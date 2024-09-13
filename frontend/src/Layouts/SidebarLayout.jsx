import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar' // Assuming Sidebar is in Components folder

const SidebarLayout = () => {
    return (
        <div className="flex pl-8 pr-8">
            <Sidebar /> {/* Sidebar on the left */}
            <div className="flex-grow p-4">
                <Outlet /> {/* Child components will be rendered here */}
            </div>
        </div>
    )
}

export default SidebarLayout
