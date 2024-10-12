import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function UpdateBlogForm() {
    const { id } = useParams()
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        content: '',
        image: '',
    })

    const [loading, setLoading] = useState(true)
    const [imagePreview, setImagePreview] = useState(null) // State for image preview

    useEffect(() => {
        if (!id) {
            return
        }

        // Fetch the blog data by id
        axios
            .get(`/blog/get/${id}`)
            .then((res) => {
                setBlog(res.data) // Set the blog data to the state
                setImagePreview(res.data.image) // Set the initial image preview
                setLoading(false) // Set loading to false after data is loaded
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [id])

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value, files } = e.target

        if (name === 'blogImage') {
            // Handle file input
            setBlog((prevBlog) => ({
                ...prevBlog,
                image: files[0], // Store the file itself
            }))
        } else {
            setBlog((prevBlog) => ({
                ...prevBlog,
                [name]: value,
            }))
        }
    }

    // Handle file input changes (for image)
    const handleImageChange = (e) => {
        const file = e.target.files[0] // Get the uploaded file
        setBlog((prevBlog) => ({
            ...prevBlog,
            image: file, // Set the file in state
        }))
    }
    const Navigate = useNavigate()

    /// Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', blog.title)
        formData.append('author', blog.author)
        formData.append('content', blog.content)

        if (blog.image) {
            formData.append('blogImage', blog.image) // Ensure the field name matches
        }

        try {
            await axios.put(`/blog/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            alert('Blog updated successfully!')
            Navigate('/dashboard')
        } catch (err) {
            console.error(err)
        }
    }

    // Wait for the blog data to load before rendering the form
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h1 className="mb-6 text-3xl font-bold">Update Blog</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={blog.title} // Set the value to the blog title
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
                        value={blog.author} // Set the value to the blog author
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
                        value={blog.content} // Set the value to the blog content
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
                        onChange={handleImageChange} // Use the new handler
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
