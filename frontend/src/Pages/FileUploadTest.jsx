import React, { useState } from 'react';
import ImageUploadHandler from '../Components/ImageUpload';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadSuccess = (url, message) => {
    setUploadMessage(message);
    setUploadUrl(url);
  };

  const handleUploadError = (message) => {
    setUploadMessage(message);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        onChange={handleFileChange}
      />
      <p
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        SVG, PNG, JPG or GIF (MAX. 800x400px).
      </p>

      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full max-w-xs rounded-lg"
          />
        </div>
      )}

      {/* This is where the upload component is used */}
      <ImageUploadHandler
        file={selectedFile}
        folder="avatars"
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
      />

      {uploadMessage && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {uploadMessage}
        </p>
      )}

      {uploadUrl && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Image URL: <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{uploadUrl}</a>
        </p>
      )}
    </div>
  );
};

export default ImageUpload;

