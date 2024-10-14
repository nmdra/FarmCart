import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function BlogList() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true) // Loading state
    const [error, setError] = useState(null) // Error state

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/api/Blog')
            setBlogs(res.data)
            console.log(res.data)
        } catch (err) {
            console.error(err)
            setError('Failed to load blogs.') // Set error message
        } finally {
            setLoading(false)
        }
    }

    const deleteBlog = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this Blog?'
        )
        if (confirmed) {
            try {
                await axios.delete(`/api/Blog/delete/${id}`)
                alert('Blog deleted successfully!')
                fetchBlogs() // Refresh the blog list
            } catch (error) {
                console.error('Error deleting blog:', error)
                alert('Blog deletion failed.')
            }
        }
    }

    if (loading) {
        return <div className="text-center">Loading blogs...</div> // Loading message
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div> // Error message
    }

    return (
        <>
            <section className="p-6 mx-auto mt-20 bg-white rounded-md shadow-md max-w-7xl dark:bg-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-bold text-black capitalize dark:text-black">
                        Blog List
                    </h1>
                </div>

                <div className="space-y-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="flex items-start p-4 bg-white rounded-md shadow-md dark:bg-white"
                        >
                            <div className="flex-shrink-0 mr-4">
                                <img
                                    src={`${blog.newsImage}`}
                                    alt={blog.title}
                                    className="object-cover w-32 h-32 border rounded-md border-lime-500"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-black">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 dark:text-black">
                                    Author: {blog.author}
                                </p>
                                <p className="mt-2 text-gray-600 dark:text-black line-clamp-3">
                                    {blog.content.substring(0, 50)}...
                                </p>
                            </div>
                            <div className="flex items-center ml-4 space-x-4">
                                <button
                                    className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                                    onClick={() => deleteBlog(blog._id)}
                                >
                                    Delete
                                </button>
                                <Link
                                    to={`/update-blog/${blog._id}`}
                                    state={{ blogToEdit: blog }}
                                >
                                    <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                                        Update
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default BlogList
