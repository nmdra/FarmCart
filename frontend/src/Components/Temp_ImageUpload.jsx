import React, { useState } from 'react'
import axios from 'axios'

const FileUploadHandler = ({
    file,
    folder,
    onUploadSuccess,
    onUploadError,
}) => {
    const handleUpload = async () => {
        if (!file) {
            onUploadError('No file selected')
            return
        }

        const formData = new FormData()
        formData.append('image', file)
        formData.append('folder', folder)

        try {
            const response = await axios.post('/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            onUploadSuccess(response.data.url, response.data.message)
        } catch (error) {
            onUploadError('Upload failed: ' + error.message)
        }
    }

    return (
        <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
            Upload
        </button>
    )
}

export default FileUploadHandler
