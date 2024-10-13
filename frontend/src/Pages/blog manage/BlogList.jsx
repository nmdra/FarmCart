import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function BlogList() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('/blog/')
            setBlogs(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteBlog = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this Blog?'
        )
        if (confirmed) {
            try {
                await axios.delete(`/blog/delete/${id}`)
                alert('Blog deleted successfully!')
                fetchBlogs()
            } catch (error) {
                console.error('Error deleting blog:', error)
                alert('Blog deletion failed.')
            }
        }
    }

    return (
        <>
            <section className="p-6 mx-auto mt-20 bg-green-700 rounded-md shadow-md max-w-7xl dark:bg-green-800">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-bold text-white capitalize dark:text-white">
                        Blog List
                    </h1>
                </div>

                <div className="space-y-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="flex items-start p-4 bg-white rounded-md shadow-md dark:bg-green--800"
                        >
                            <div className="flex-shrink-0 mr-4">
                                <img
                                    src={'/blogImages/' + blog.image}
                                    alt={blog.title}
                                    className="object-cover w-32 h-32 border border-green-300 rounded-md"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 dark:text-green-300">
                                    Author: {blog.author}
                                </p>
                                <p className="mt-2 text-gray-600 dark:text-green--400 line-clamp-3">
                                    {blog.content.substring(0, 20)}...
                                </p>
                            </div>
                            <div className="flex items-center ml-4 space-x-4">
                                <button
                                    className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                                    onClick={() => deleteBlog(blog._id)}
                                >
                                    Delete
                                </button>
                                <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                                    <Link
                                        to={`/update-blog/${blog._id}`}
                                        state={{ blogToEdit: blog }}
                                    >
                                        Update
                                    </Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default BlogList
