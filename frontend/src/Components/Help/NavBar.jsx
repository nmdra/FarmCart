import logo from '../../../public/logoIcon.png'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-white/60 ">
            <div className="bg-[#b8f724] p-2">
                <h1 className="max-w-2xl px-2 py-3 mx-auto text-sm font-semibold text-center">
                    Need Instant Help? 🚀 Our Live Chat is Coming Soon to Assist
                    You in Real-Time! 👋
                </h1>
            </div>
            <div className="px-10 py-6 border-b">
                <div className="flex items-center justify-between ">
                    <div>
                        <Link to="/help" className="flex items-center gap-x-3 ">
                            <img src={logo} alt="logo" className="w-10 h-10" />
                            <h1 className="text-3xl font-semibold">help</h1>
                        </Link>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <Link
                            to="/"
                            className="px-4 py-3 text-sm rounded-md hover:underline hover:text-[#99dd05]"
                        >
                            Farmcart pro Help Center
                        </Link>
                        <Link
                            to="/help/feedback"
                            className="px-4 py-3 text-sm rounded-md hover:underline hover:text-[#99dd05]"
                        >
                            Send Feedback
                        </Link>
                        <Link
                            to="/"
                            className="px-4 py-3 text-sm rounded-md hover:text-[#99dd05] hover:underline"
                        >
                            Go to Farmcart.com
                        </Link>
                        <Link
                            to="/help/support-ticket"
                            className="px-4 py-3 bg-[#b8f724] rounded-md text-sm"
                        >
                            Support Ticket
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
