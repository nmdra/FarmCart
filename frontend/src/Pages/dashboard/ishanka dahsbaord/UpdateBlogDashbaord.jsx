import UpdateBlog from '../../blog manage/UpdateBlog'
import { Link } from 'react-router-dom'
import back from '../../../assets/Back.png'

const AdminUpdateTour = () => {
    return (
        <div className="flex min-h-screen">
            <aside className="flex flex-col w-64 text-black bg-gray-200">
                <div className="p-4 text-xl font-bold bg-white">
                    Admin Dashboard
                </div>

                <nav className="flex-1 px-2 py-4 space-y-2"></nav>

                <div className="p-4">
                    <button className="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-500">
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-6 bg-gray-100">
                <header className="p-4 mb-4 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Welcome, Admin!
                    </h2>
                </header>

                <Link to="/dashboard">
                    <button className="flex items-center px-4 py-2 font-bold text-black rounded hover:bg-lime-500">
                        <img
                            src={back}
                            alt="Back Icon"
                            className="w-6 h-6 mr-2"
                        />
                        Go Back To Dashboard
                    </button>
                </Link>

                <div>
                    <UpdateBlog />
                </div>
            </main>
        </div>
    )
}

export default AdminUpdateTour
