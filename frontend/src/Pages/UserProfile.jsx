const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold mb-4">User Profile</h1>
                <p className="text-lg mb-8">Welcome, {user.name || user.email}!</p>
                <p className="text-lg mb-8">Name: {user.name}</p>
                <p className="text-lg mb-8">ID: {user._id}</p>
                <p className="text-lg mb-8">Email: {user.email}</p>
            </div>
        </div>
    );
};

export default UserProfile;
