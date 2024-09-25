import { useState, useEffect } from 'react'
import axios from 'axios'
import Address from '../../Components/Address'

function Settings() {
    const [previewUrl, setPreviewUrl] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadMessage, setUploadMessage] = useState('')
    // const [uploadUrl, setUploadUrl] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [loading, setLoading] = useState(false) // State to track loading status
    const [emailError, setEmailError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))

    console.log(user)

    // State for updating user details
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setcontactNumber] = useState('')
    const [birthday, setBirthday] = useState('')

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneRegex =
        /^(?:0(?:71|77|76|75|74|73|72|71|11)|\+947[1-9]|(?:07[1-9]))[0-9]{7}$/
    // https://stackoverflow.com/a/2385967
    const nameRegex = /^[a-z ,.'-]+$/i

    useEffect(() => {
        document.title = 'FarmCart : Settings'
    }, [])

    useEffect(() => {
        if (user) {
            setfirstname(user.firstname || '')
            setlastname(user.lastname || '')
            setEmail(user.email || '')
            setcontactNumber(user.contactNumber || '')
            setPreviewUrl(user.pic || '')
            setBirthday(user.birthday || '')
        }
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

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

            setUploadMessage(response.data.message)
            console.log(response.data)
            // setUploadUrl(response.data.url) // Set the uploaded image URL
            return response.data.url
        } catch (error) {
            setUploadMessage('Upload failed: ' + error.message)
            throw new Error('Upload failed') // Throw an error for the catch block
        } finally {
            setLoading(false) // Stop loading
        }
    }

    const handleSaveChanges = async () => {
        try {
            // Upload the avatar image if a file is selected
            const uploadedUrl = await handleUpload() // Wait for the upload to complete

            // If upload is successful, proceed with updating user details
            const userDetails = {
                firstname,
                lastname,
                email,
                contactNumber,
                birthday,
                pic: uploadedUrl || user.pic, // Use the uploaded avatar URL or existing one
            }

            console.log({ userDetails })

            const response = await axios.put('/api/users', userDetails)
            console.log('Update successful:', response.data)
            alert('Account details updated successfully')

            const json = response.data.user
            console.log('Update successful:', json)

            // Save updated user details to localStorage
            localStorage.setItem('user', JSON.stringify(json))
        } catch (error) {
            console.error('Error updating account details:', error)
            alert('Failed to update account details')
        }
    }

    const handlePhoneChange = (e) => {
        const contactNumber = e.target.value

        if (!phoneRegex.test(contactNumber)) {
            setPhoneError('Invalid Sri Lankan phone number')
        } else {
            setPhoneError('')
        }
        setcontactNumber(contactNumber) // Update phone number state
    }

    // Handle changes to the email input
    const handleEmailChange = (e) => {
        const newEmail = e.target.value

        // Check if the email is valid
        if (newEmail && !emailRegex.test(newEmail)) {
            setEmailError('Invalid email format')
        } else {
            setEmailError('') // Clear any errors if valid
        }

        setEmail(newEmail) // Update email state
    }

    // Handle changes to the first name input
    const handleFirstNameChange = (e) => {
        const newFirstName = e.target.value

        // Check if the first name is valid
        if (newFirstName && !nameRegex.test(newFirstName)) {
            setFirstNameError('Invalid first name format')
        } else {
            setFirstNameError('') // Clear any errors if valid
        }

        setfirstname(newFirstName) // Update first name state
    }

    // Handle changes to the last name input
    const handleLastNameChange = (e) => {
        const newLastName = e.target.value

        // Check if the last name is valid
        if (newLastName && !nameRegex.test(newLastName)) {
            setLastNameError('Invalid last name format')
        } else {
            setLastNameError('') // Clear any errors if valid
        }

        setlastname(newLastName) // Update last name state
    }

    return (
        <div className="relative min-h-screen bg-gray-50 grid grid-cols-1 justify-center">
            {/* Main Content */}
            <div className="pl-18 p-8 max-w-6xl w-full">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
                    {/* Account Settings */}
                    <div className="bg-white py-4 px-8 mx-8 rounded-lg shadow-sm col-span-2 border-2 border-green-600">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                            Account Settings
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                            {/* Avatar Upload */}
                            <div className="flex flex-col items-center col-span-2 md:col-span-1">
                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
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
                                {loading && (
                                    <div className="mt-4">
                                        <svg
                                            className="animate-spin h-5 w-5 mr-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 0114.276-4.8L4.64 12H4z"
                                            ></path>
                                        </svg>
                                    </div>
                                )}
                                {uploadMessage && (
                                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                        {uploadMessage}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2 md:col-span-1">
                                <div>
                                    <label className="block text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={firstname || 'First Name'}
                                        value={firstname}
                                        // onChange={(e) =>
                                        //     setfirstname(e.target.value)
                                        // }
                                        onChange={handleFirstNameChange}
                                        className="border p-2 rounded-md w-full"
                                    />
                                    {firstNameError && (
                                        <div className="text-red-500 text-sm">
                                            {firstNameError}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder={lastname || 'Last Name'}
                                        value={lastname}
                                        // onChange={(e) =>
                                        //     setlastname(e.target.value)
                                        // }
                                        onChange={handleLastNameChange}
                                        className="border p-2 rounded-md w-full"
                                    />
                                    {lastNameError && (
                                        <div className="text-red-500 text-sm">
                                            {lastNameError}
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder={email || 'Email'}
                                        value={email}
                                        // onChange={(e) => setEmail(e.target.value)}
                                        onChange={handleEmailChange}
                                        className="border p-2 rounded-md w-full"
                                    />
                                    {emailError && (
                                        <div className="text-red-500 text-sm">
                                            {emailError}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={contactNumber}
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
                                        placeholder={birthday || 'Birthday'}
                                        value={birthday}
                                        onChange={(e) =>
                                            setBirthday(e.target.value)
                                        }
                                        className="border p-2 rounded-md w-full"
                                        min="1950-01-01"
                                        max="2010-12-31"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-green-500 text-white p-2 rounded-md"
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </button>
                            <button className="bg-red-500 text-white p-2 rounded-md">
                                Delete My Account
                            </button>
                        </div>
                    </div>
                </div>
                <Address />
            </div>
        </div>
    )
}

export default Settings
