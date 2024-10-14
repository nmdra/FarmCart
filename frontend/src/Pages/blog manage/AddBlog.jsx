import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AddNews() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [uploadMessage, setUploadMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 5MB limit
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png']

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])

    // Validate title length
    const validateTitle = () => {
        if (!title) return 'Title is required'
        if (title.length > 100) return 'Title cannot exceed 100 characters'
        return ''
    }

    // Validate content length
    const validateContent = () => {
        if (!content) return 'Content is required'
        if (content.length < 20) return 'Content must be at least 20 characters'
        return ''
    }

    // Validate author name (no numbers allowed)
    const validateAuthor = () => {
        if (!author) return 'Author is required'
        const regex = /^[a-zA-Z\s]*$/
        if (!regex.test(author))
            return 'Author name should not contain numbers or special characters'
        return ''
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadMessage('No file selected')
            return null
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setUploadMessage('File size exceeds the 5MB limit.')
            return null
        }

        if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
            setUploadMessage('Only JPG or PNG files are allowed.')
            return null
        }

        const formData = new FormData()
        formData.append('image', selectedFile)
        formData.append('folder', 'avatars')

        setLoading(true)

        try {
            const response = await axios.post('/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            return response.data.url
        } catch (error) {
            setUploadMessage('Upload failed: ' + error.message)
            return null
        } finally {
            setLoading(false)
        }
    }

    const addNews = async (e) => {
        e.preventDefault()

        const titleError = validateTitle()
        const contentError = validateContent()
        const authorError = validateAuthor()

        if (titleError || contentError || authorError) {
            setErrors({
                title: titleError,
                content: contentError,
                author: authorError,
            })
            return
        }

        try {
            const uploadedUrl = await handleUpload()

            if (!uploadedUrl) return

            const news = {
                title,
                content,
                author,
                newsImage: uploadedUrl,
            }

            await axios.post('/api/blog/add', news)
            setSuccessMessage('✅ Blog added successfully!')
            resetForm()
        } catch (err) {
            console.error('Error adding Blog:', err)
            alert('Failed to add Blog: ' + err.message)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

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
                <div className="p-4 mb-4 text-center text-white rounded-md bg-lime-600">
                    {successMessage}
                </div>
            )}

            {uploadMessage && (
                <div className="p-4 mb-4 text-center text-white bg-red-600 rounded-md">
                    {uploadMessage}
                </div>
            )}

            <section className="max-w-4xl p-6 mx-auto mt-20 rounded-md shadow-md bg-lime-700 dark:bg-gray-200">
                <h1 className="text-xl font-bold text-black capitalize dark:text-black">
                    Add Blog
                </h1>

                <form onSubmit={addNews}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label
                                className="text-black dark:text-black"
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
                                className="text-black dark:text-black"
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
                                className="text-black dark:text-black"
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
                                className="block mb-2 font-medium text-black text-l dark:text-black"
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

                        {imagePreview && (
                            <div className="col-span-2 mt-4">
                                <h2 className="text-black dark:text-black">
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
                            className="px-6 py-2 leading-5 text-white rounded-md bg-lime-500 hover:bg-lime-600"
                            disabled={loading}
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
