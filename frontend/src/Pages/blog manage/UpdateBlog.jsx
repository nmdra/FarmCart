import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function UpdateBlogForm() {
    const { id } = useParams()
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        content: '',
        image: null,
    })

    const [loading, setLoading] = useState(true)
    const [imagePreview, setImagePreview] = useState(null)
    const [uploadMessage, setUploadMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState({}) // State for validation errors
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return

        const fetchBlog = async () => {
            try {
                const res = await axios.get(`/api/Blog/get/${id}`)
                setBlog(res.data)
                setImagePreview(res.data.image) // Set the initial image preview
            } catch (err) {
                console.error(err)
                setError('Failed to fetch blog data.')
            } finally {
                setLoading(false)
            }
        }

        fetchBlog()
    }, [id])

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBlog((prevBlog) => ({
            ...prevBlog,
            [name]: value,
        }))
    }

    // Function to handle image file selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setBlog((prevBlog) => ({
                ...prevBlog,
                image: file, // Store the file itself
            }))
            setImagePreview(URL.createObjectURL(file)) // Create preview URL for the selected image
        }
    }

    // Function to handle image upload
    const handleUpload = async () => {
        const { image } = blog // Get the image from state
        if (!image) {
            setUploadMessage('No file selected')
            return null
        }

        const formData = new FormData()
        formData.append('image', image)
        formData.append('folder', 'blogs') // Adjust folder as needed

        try {
            const response = await axios.post('/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            setUploadMessage('Image uploaded successfully!')
            return response.data.url // Return the uploaded image URL
        } catch (error) {
            setUploadMessage('Upload failed: ' + error.message)
            console.error('Upload error:', error)
            return null // Return null to signify failure
        }
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null) // Reset error state
        setSuccessMessage('') // Reset success message
        setErrors({}) // Reset validation errors

        // Validate required fields
        const validationErrors = {}
        if (!blog.title) validationErrors.title = 'Title is required'
        if (!blog.content) validationErrors.content = 'Content is required'
        if (!blog.author) validationErrors.author = 'Author is required'

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors)
            return
        }

        try {
            // Handle image upload and get the URL
            const uploadedUrl = await handleUpload()

            const updatedBlog = {
                ...blog,
                newsImage: uploadedUrl || blog.image, // Use the uploaded image URL or keep the existing one
            }

            await axios.put(`/api/Blog/update/${id}`, updatedBlog)
            setSuccessMessage('Blog updated successfully!')
            navigate(`/blog/${id}`) // Redirect to the updated blog post
        } catch (err) {
            console.error('Error updating blog:', err)
            setError('Failed to update the blog. Please try again.')
        }
    }

    // Wait for the blog data to load before rendering the form
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h1 className="mb-6 text-3xl font-bold">Update Blog</h1>
            {error && <div className="text-red-500">{error}</div>}
            {successMessage && (
                <div className="text-lime-500">{successMessage}</div>
            )}
            {errors.title && <div className="text-red-500">{errors.title}</div>}
            {errors.content && (
                <div className="text-red-500">{errors.content}</div>
            )}
            {errors.author && (
                <div className="text-red-500">{errors.author}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleInputChange}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Author
                    </label>
                    <input
                        type="text"
                        name="author"
                        value={blog.author}
                        onChange={handleInputChange}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        name="content"
                        value={blog.content}
                        onChange={handleInputChange}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows="8"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Upload New Image
                    </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Image Preview Section */}
                {imagePreview && (
                    <div className="mt-4">
                        <h2 className="text-sm font-medium text-gray-700">
                            Image Preview:
                        </h2>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-auto mt-2 rounded-md"
                        />
                    </div>
                )}

                <div className="text-right">
                    <button
                        type="submit"
                        className="px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                        Update Blog
                    </button>
                </div>
            </form>
        </div>
    )
}
