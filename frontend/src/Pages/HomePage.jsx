import { Link } from 'react-router-dom'

const Homepage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to FarmCart</h1>
                <p className="text-lg mb-8">
                    FarmCart is the perfect platform for farmers to sell their
                    fresh harvest directly to customers. We offer a variety of
                    pre-made and customizable vegetable boxes, manage delivery
                    tracking, payments, feedback, and ensure high-quality
                    communication between farmers and customers.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/login"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Register
                    </Link>
                    <Link
                        to="/shops"
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Shops
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Homepage
