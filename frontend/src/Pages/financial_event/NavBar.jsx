import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-lime-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">
                    FarmCart
                </Link>
                <div>
                    <Link
                        to="/login"
                        className="text-white mr-4 hover:underline"
                    >
                        Login
                    </Link>
                    <Link to="/register" className="text-white hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
