import { useState } from 'react';
import axios from 'axios';

const UserDetailForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) return;

    setUploading(true);
    
    // Upload avatar to Cloudinary
    const formData = new FormData();
    formData.append('file', avatar);
    formData.append('upload_preset', 'your_upload_preset'); // replace with your preset

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);
      setAvatarUrl(response.data.secure_url);
      console.log('Uploaded avatar:', response.data.secure_url);

      // You can now use the name, email, and avatarUrl to submit your form data to your backend
      // Example: await axios.post('/api/user', { name, email, avatarUrl });
      
      // Reset form
      setName('');
      setEmail('');
      setAvatar(null);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Avatar</label>
          <input
            type="file"
            onChange={handleAvatarChange}
            accept="image/*"
            required
            className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
      </form>

      {avatarUrl && (
        <div className="mt-4">
          <img src={avatarUrl} alt="Uploaded Avatar" className="rounded-full w-24 h-24" />
        </div>
      )}
    </div>
  );
};

export default UserDetailForm;
