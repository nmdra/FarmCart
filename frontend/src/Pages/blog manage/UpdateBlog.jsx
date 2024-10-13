import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateBlogForm() {
    const { id } = useParams();
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        content: '',
        image: null,
    });

    const [loading, setLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null); // Error state
    const [success, setSuccess] = useState(false); // Success state
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        const fetchBlog = async () => {
            try {
                const res = await axios.get(`/api/Blog/get/${id}`); // Adjust the endpoint as needed
                setBlog(res.data);
                setImagePreview(res.data.image); // Set the initial image preview
            } catch (err) {
                console.error(err);
                setError('Failed to fetch blog data.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlog((prevBlog) => ({
            ...prevBlog,
            [name]: value,
        }));
    };

    // Function to handle image file selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBlog((prevBlog) => ({
                ...prevBlog,
                image: file, // Store the file itself
            }));
            setImagePreview(URL.createObjectURL(file)); // Create preview URL for the selected image
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        setSuccess(false); // Reset success state

        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('author', blog.author);
        formData.append('content', blog.content);

        if (blog.image) {
            formData.append('blogImage', blog.image); // Ensure the field name matches
        }

        try {
            await axios.put(`/api/Blog/update/${id}`, formData, { // Adjust the endpoint as needed
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);
            setBlog({ title: '', author: '', content: '', image: null }); // Reset form
            setImagePreview(null); // Reset image preview
            // Optionally redirect or navigate after successful update
            navigate(`/blog/${id}`); // Redirect to the updated blog post
        } catch (err) {
            console.error(err);
            setError('Failed to update the blog. Please try again.'); // Set error message
        }
    };

    // Wait for the blog data to load before rendering the form
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h1 className="mb-6 text-3xl font-bold">Update Blog</h1>
            {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
            {success && <div className="text-green-500">Blog updated successfully!</div>} {/* Display success message */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
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
                    <label className="block text-sm font-medium text-gray-700">Author</label>
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
                    <label className="block text-sm font-medium text-gray-700">Content</label>
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
                    <label className="block text-sm font-medium text-gray-700">Upload New Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Image Preview Section */}
                {imagePreview && (
                    <div className="mt-4">
                        <h2 className="text-sm font-medium text-gray-700">Image Preview:</h2>
                        <img src={imagePreview} alt="Preview" className="w-full h-auto mt-2 rounded-md" />
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
    );
}
