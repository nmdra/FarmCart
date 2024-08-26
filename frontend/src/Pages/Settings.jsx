import { useState } from 'react'
import Sidebar from '../Components/Sidebar' // Import the Sidebar component

function Settings() {
    const [selectedImage, setSelectedImage] = useState(null)
    const [phoneError, setPhoneError] = useState('')

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(URL.createObjectURL(file))
        }
    }

    const handlePhoneChange = (e) => {
        const phoneNumber = e.target.value
        const sriLankanPhoneRegex = /^(?:\+94|0)?(?:7[0125678]\d)\d{7}$/

        if (!sriLankanPhoneRegex.test(phoneNumber)) {
            setPhoneError('Invalid Sri Lankan phone number')
        } else {
            setPhoneError('')
        }
    }

    return (
        <div className="relative min-h-screen bg-gray-50 flex justify-center">
            {/* Floating Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="pl-72 p-6 max-w-6xl w-full">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
                    {/* Account Settings */}
                    <div className="bg-white p-6 rounded-lg shadow-sm col-span-2 border-2">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Account Settings
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                            {/* Avatar Upload */}
                            <div className="flex flex-col items-center col-span-2 md:col-span-1">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                                    {selectedImage ? (
                                        <img
                                            src={selectedImage}
                                            alt="Selected Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <label className="mt-4 bg-green-400 text-black px-2 py-2 rounded-md cursor-pointer hover:bg-green-500">
                                    Choose File
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2 md:col-span-1">
                                <div>
                                    <label className="block text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="border p-2 rounded-md w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="border p-2 rounded-md w-full"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="border p-2 rounded-md w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        className={`border p-2 rounded-md w-full ${phoneError ? 'border-red-500' : ''}`}
                                        onChange={handlePhoneChange}
                                    />
                                    {phoneError && (
                                        <div className="text-red-500 text-sm">
                                            {phoneError}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700">
                                        Birthday
                                    </label>
                                    <input
                                        type="date"
                                        className="border p-2 rounded-md w-full"
                                        min="2010-01-01"
                                        max="2100-12-31"
                                    />
                                </div>
                            </div>
                            <button className="mt-4 bg-green-500 text-white p-2 rounded-md col-span-2 w-1/5">
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Change Password */}
                    <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm border-2">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Change Password
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                            <div>
                                <label className="block text-gray-700">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="border p-2 rounded-md w-full"
                                />
                            </div>
                        </div>
                        <button className="mt-4 bg-green-500 text-white p-2 rounded-md">
                            Change Password
                        </button>
                    </div>

                    {/* Delete Account */}
                    <div className="col-span-2 text-right">
                        <button className="bg-red-500 text-white p-2 rounded-md">
                            Delete My Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
