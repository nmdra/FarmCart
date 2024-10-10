// src/DLImageUpload.jsx
import React, { useState } from 'react'
import axios from 'axios'

const DLImageUpload = () => {
    /* const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [message, setMessage] = useState('')

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            setPreviewUrl(URL.createObjectURL(selectedFile))
        }
    }

    // Handle file upload
    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.')
            return
        }

        const formData = new FormData()
        formData.append('image', file)

        try {
            const response = await axios.post(
                '/api/delivery/images/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            setMessage('Image uploaded successfully!')
            console.log('Uploaded image:', response.data)
        } catch (error) {
            setMessage('Image upload failed.')
            console.error('Error uploading image:', error)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Upload an Image</h2>

            <input type="file" onChange={handleFileChange} className="mb-4" />

            {previewUrl && (
                <div className="mb-4">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-64 h-64 object-cover"
                    />
                </div>
            )}

            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Upload Image
            </button>

            {message && <p className="mt-4">{message}</p>}
        </div>
    )
        */
}

export default DLImageUpload
