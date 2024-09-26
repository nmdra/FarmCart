import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import notFoundImage from '../assets/notFound.png' // Make sure to replace this with the actual image path

const NotFound = () => {
    useEffect(() => {
        document.title = 'FarmCart : Not Found'
    }, [])
    return (
        <section className="flex flex-col justify-center items-center min-h-screen bg-white">
            <div className="text-center">
                <img
                    src={notFoundImage}
                    alt="404 illustration"
                    className="w-full max-w-md mx-auto mb-8"
                />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    Oops! Page not found
                </h1>

                <p className="text-gray-600 mb-6">
                    Not to worry,
                    <br />
                    why don't you try one of these helpful links
                </p>
                <Link
                    to="/"
                    className="inline-block bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition-all duration-300"
                >
                    Back to Home
                </Link>
                <Link
                    to="/"
                    className="inline-block bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition-all duration-300 ml-4"
                >
                    Blog
                </Link>
                <Link
                    to="/"
                    className="inline-block bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition-all duration-300 ml-4"
                >
                    Support
                </Link>
            </div>
        </section>
    )
}

export default NotFound
