import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar' // Assuming Sidebar is in Components folder

const SidebarLayout = () => {
    return (
        <div className="flex">
            <aside className="fixed h-screen top-30 left-2 w-72 z-10">
                {' '}
                {/* Fixed position */}
                <Sidebar /> {/* Sidebar on the left */}
            </aside>

            <div className="ml-64 flex-grow p-4">
                {' '}
                {/* Add left margin to content */}
                <Outlet /> {/* Child components will be rendered here */}
            </div>
        </div>
    )
}

export default SidebarLayout
