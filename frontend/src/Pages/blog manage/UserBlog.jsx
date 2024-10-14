import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import Navbar from '../../Components/Home/NewsBar'
import Footer from '../../Components/Home/Footer'
import headerVideo from '../../assets/logo/header.mp4' // Adjusted import for the header video

export default function TourismBlog() {
    const [blogs, setBlogs] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [latestBlogs, setLatestBlogs] = useState([])

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogResponse = await axios.get('/api/Blog/')
                setBlogs(blogResponse.data)
                console.log(blogResponse.data)
                setLatestBlogs(blogResponse.data.slice(0, 5)) // Get the latest 5 blogs
            } catch (error) {
                console.error('Error fetching data:', error)
                setError('Failed to fetch data. Please try again later.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Filter blogs based on the search term
    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Set interval for the slideshow of latest blogs
    useEffect(() => {
        if (latestBlogs.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide(
                    (prevSlide) => (prevSlide + 1) % latestBlogs.length
                )
            }, 5000) // Change slides every 3 seconds
            return () => clearInterval(interval)
        }
    }, [latestBlogs])

    return (
        <div>
            {/* <Navbar /> */}

            {/* Header Video Section */}
            <div className="relative">
                <video
                    src={headerVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full rounded-lg shadow-lg h-80"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <h1 className="p-4 text-3xl font-bold text-center text-white md:text-4xl lg:text-5xl">
                        Welcome To Our Blog!
                    </h1>
                    <p className="max-w-md px-4 mx-auto text-sm text-center text-white md:text-lg lg:text-xl">
                        Dive into the world of sustainable farming, fresh
                        produce, and rural living. Whether you're a seasoned
                        farmer or just curious about farm life, we invite you to
                        explore, learn, and grow with us. Happy reading!
                    </p>
                </div>
            </div>

            {/* Latest News Section */}
            <div className="py-1 bg-gradient-to-r from-white">
                <div className="container px-4 mx-auto">
                    <h2 className="mb-6 text-3xl font-bold text-center text-black">
                        Trending Blogs!
                    </h2>
                    <div className="relative w-full h-48 overflow-hidden rounded-lg shadow-lg">
                        {latestBlogs.length > 0 && (
                            <div
                                className="absolute inset-0 flex items-center justify-center transition-transform duration-1000"
                                style={{
                                    transform: `translateX(-${currentSlide * 100}%)`,
                                }}
                            >
                                {latestBlogs.map((blog) => (
                                    <Link
                                        to={`/blog/${blog._id}`}
                                        key={blog._id}
                                        className="flex-shrink-0 w-full"
                                        style={{ width: '100%' }}
                                    >
                                        <div className="relative w-full h-25">
                                            {blog.newsImage && (
                                                <img
                                                    src={blog.newsImage.replace(
                                                        /\.\w+$/,
                                                        '.webp'
                                                    )}
                                                    alt={blog.title}
                                                    className="object-cover w-full h-full rounded-lg shadow-lg"
                                                />
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                                <div className="px-4 text-center text-white">
                                                    <h3 className="text-xl font-semibold">
                                                        {blog.title}
                                                    </h3>
                                                    <p className="mt-1">
                                                        {blog.excerpt ||
                                                            blog.content.substring(
                                                                0,
                                                                100
                                                            ) + '...'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="min-h-screen pt-20 mt-6 bg-gradient-to-br from-gray-100 to-white md:mt-10 md:mx-10">
                <nav className="sticky top-0 z-10 py-6 text-white shadow-md bg-lime-600">
                    <div className="container px-4 mx-auto">
                        <div className="flex items-center justify-between ml-20">
                            <div className="relative w-full max-w-xs">
                                <label htmlFor="search" className="sr-only">
                                    Search Blogs...
                                </label>
                                <input
                                    id="search"
                                    type="text"
                                    placeholder="Search Blogs..."
                                    className="w-full px-4 py-2 pr-10 text-black transition duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <Search
                                    className="absolute text-black transform -translate-y-1/2 right-3 top-1/2"
                                    size={20}
                                />
                            </div>
                            <Link to="/speechgenerator">
                                <button className="px-4 py-2 ml-4 text-white transition duration-300 rounded-full bg-lime-700 hover:bg-lime-900">
                                    Speech Generator
                                </button>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Blog Section */}
                <div className="container px-4 py-8 mx-auto">
                    {loading && (
                        <p className="text-center text-black">
                            Loading data...
                        </p>
                    )}
                    {error && (
                        <p className="text-center text-red-500">{error}</p>
                    )}

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredBlogs.map((blog) => (
                            <Link
                                to={`/blog/${blog._id}`}
                                key={blog._id}
                                className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="relative">
                                    {blog.newsImage && (
                                        <img
                                            src={blog.newsImage.replace(
                                                /\.\w+$/,
                                                '.webp'
                                            )}
                                            alt={blog.title}
                                            className="object-cover w-full h-64"
                                        />
                                    )}
                                    <div className="p-6">
                                        <h2 className="mb-2 text-2xl font-bold text-lime-900">
                                            {blog.title}
                                        </h2>
                                        <div className="flex items-center mb-2 text-black">
                                            <span>{blog.author}</span>
                                            <span className="ml-4">
                                                {new Date(
                                                    blog.createdAt
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mb-4 text-black">
                                            {blog.excerpt ||
                                                blog.content.substring(0, 100) +
                                                    '...'}
                                        </p>
                                        <Link to={`/blog/${blog._id}`}>
                                            <span className="inline-block px-4 py-2 text-white transition duration-300 transform rounded-full bg-lime-500 hover:bg-lime-600 hover:translate-y-1">
                                                Read More
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
