import React, { useState } from 'react';
import axios from 'axios';

function AddNews() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [newsImage, setNewsImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  function addNews(e) {
    e.preventDefault();

    const news = {
      title,
      content,
      author,
      newsImage,
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    if (newsImage) {
      formData.append("newsImage", newsImage);
    }

    axios.post("/news/add", formData)
      .then(() => {
        setSuccessMessage('✅ News added successfully!');
        setTitle('');
        setContent('');
        setAuthor('');
        setNewsImage(null);
        setImagePreview(null); // Clear the image preview

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewsImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    } else {
      setNewsImage(null);
      setImagePreview(null); // Reset preview if no file is selected
    }
  };

  return (
    <>
      {successMessage && (
        <div className="p-4 mb-4 text-center text-white bg-blue-600 rounded-md">
          {successMessage}
        </div>
      )}
      <section className="max-w-4xl p-6 mx-auto mt-20 bg-blue-700 rounded-md shadow-md dark:bg-gray-800">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">Add News</h1>

        <form onSubmit={addNews}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-green-200" htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                className="block w-full px-4 py-2 mt-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="author">Author</label>
              <input
                id="author"
                type="text"
                className="block w-full px-4 py-2 mt-2"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              {errors.author && <p className="text-red-500">{errors.author}</p>}
            </div>

            <div className="col-span-2">
              <label className="text-white dark:text-gray-200" htmlFor="content">Content</label>
              <textarea
                id="content"
                className="block w-full px-4 py-2 mt-2"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && <p className="text-red-500">{errors.content}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium text-white text-l dark:text-white" htmlFor="newsImage">Upload Image</label>
              <input
                name="newsImage"
                className="block w-full p-2.5"
                id="newsImage"
                type="file"
                onChange={handleImageChange} // Use the new handler
              />
            </div>

            {/* Image Preview Section */}
            {imagePreview && (
              <div className="col-span-2 mt-4">
                <h2 className="text-white dark:text-gray-200">Image Preview:</h2>
                <img src={imagePreview} alt="Preview" className="w-full h-auto mt-2 rounded-md" />
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="px-6 py-2 leading-5 text-white bg-blue-500 rounded-md hover:bg-blue-900">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddNews;
