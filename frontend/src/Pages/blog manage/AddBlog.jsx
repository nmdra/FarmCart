import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AddNews() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [selectedFile, setSelectedFile] = useState(null) // State for selected file
    const [imagePreview, setImagePreview] = useState(null) // State for image preview
    const [uploadMessage, setUploadMessage] = useState('') // Message for file upload status
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false) // State to track loading
    const [errors, setErrors] = useState({})

    useEffect(() => {
        // Cleanup function to revoke object URL to avoid memory leaks
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])

    // Function to handle image upload
    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadMessage('No file selected')
            return null
        }

        const formData = new FormData()
        formData.append('image', selectedFile)
        formData.append('folder', 'avatars') // Adjust folder if needed

        setLoading(true) // Start loading

        try {
            const response = await axios.post('/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            setUploadMessage('Image uploaded successfully!')
            console.log(response.data)
            return response.data.url // Return the uploaded image URL
        } catch (error) {
            setUploadMessage('Upload failed: ' + error.message)
            console.error('Upload error:', error) // Log the error for debugging
            return null // Return null to signify failure
        } finally {
            setLoading(false) // Stop loading
        }
    }

    // Function to handle adding news
    const addNews = async (e) => {
        e.preventDefault()

        // Clear previous errors
        setErrors({})

        // Basic validation
        if (!title || !content || !author) {
            setErrors({
                title: !title ? 'Title is required' : '',
                content: !content ? 'Content is required' : '',
                author: !author ? 'Author is required' : '',
            })
            return
        }

        // Upload the image first and get the URL
        try {
            const uploadedUrl = await handleUpload()

            if (!uploadedUrl) return // Exit if image upload failed

            const news = {
                title,
                content,
                author,
                newsImage: uploadedUrl, // Use the uploaded image URL
            }

            await axios.post('/api/blog/add', news)
            setSuccessMessage('✅ News added successfully!')
            resetForm()
        } catch (err) {
            console.error('Error adding news:', err)
            alert('Failed to add news: ' + err.message)
        }
    }

    // Function to handle image file selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setImagePreview(URL.createObjectURL(file)) // Create preview URL for the selected image
        }
    }

    // Function to reset form fields
    const resetForm = () => {
        setTitle('')
        setContent('')
        setAuthor('')
        setSelectedFile(null)
        setImagePreview(null)
        setUploadMessage('')
    }

    return (
        <>
            {successMessage && (
                <div className="p-4 mb-4 text-center text-white bg-blue-600 rounded-md">
                    {successMessage}
                </div>
            )}
            <section className="max-w-4xl p-6 mx-auto mt-20 bg-blue-700 rounded-md shadow-md dark:bg-gray-800">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">
                    Add News
                </h1>

                <form onSubmit={addNews}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label
                                className="text-white dark:text-green-200"
                                htmlFor="title"
                            >
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="block w-full px-4 py-2 mt-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {errors.title && (
                                <p className="text-red-500">{errors.title}</p>
                            )}
                        </div>

                        <div>
                            <label
                                className="text-white dark:text-gray-200"
                                htmlFor="author"
                            >
                                Author
                            </label>
                            <input
                                id="author"
                                type="text"
                                className="block w-full px-4 py-2 mt-2"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                            {errors.author && (
                                <p className="text-red-500">{errors.author}</p>
                            )}
                        </div>

                        <div className="col-span-2">
                            <label
                                className="text-white dark:text-gray-200"
                                htmlFor="content"
                            >
                                Content
                            </label>
                            <textarea
                                id="content"
                                className="block w-full px-4 py-2 mt-2"
                                rows="5"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            {errors.content && (
                                <p className="text-red-500">{errors.content}</p>
                            )}
                        </div>

                        <div>
                            <label
                                className="block mb-2 font-medium text-white text-l dark:text-white"
                                htmlFor="newsImage"
                            >
                                Upload Image
                            </label>
                            <input
                                name="newsImage"
                                className="block w-full p-2.5"
                                id="newsImage"
                                type="file"
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Image Preview Section */}
                        {imagePreview && (
                            <div className="col-span-2 mt-4">
                                <h2 className="text-white dark:text-gray-200">
                                    Image Preview:
                                </h2>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-auto mt-2 rounded-md"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 leading-5 text-white bg-blue-500 rounded-md hover:bg-blue-900"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Uploading...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AddNews
