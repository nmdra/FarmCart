// import { useEffect, useState, useContext } from 'react'
// import { AuthContext } from '../context/AuthContext' // Your auth context

// const CustomerCareManagerProfile = () => {
//     const { user } = useContext(AuthContext) // Assume user info is available in context
//     const [profile, setProfile] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const userId = localStorage.getItem('userId') // Or sessionStorage.getItem('userId')
//             if (!userId) return

//             const apiUrl = `${import.meta.env.VITE_API_URL}/ccm/${userId}`

//             try {
//                 const response = await fetch(apiUrl)
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user data')
//                 }
//                 const data = await response.json()
//                 setUser(data)
//             } catch (err) {
//                 setError(err.message)
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchUserProfile()
//     }, [])

//     if (loading) {
//         return <div>Loading...</div>
//     }

//     if (error) {
//         return <div>Error: {error}</div>
//     }

//     return (
//         <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
//             <img
//                 src={profile.profilePicture}
//                 alt={`${profile.firstName} ${profile.lastName}`}
//                 className="w-24 h-24 mb-4 border-2 border-gray-300 rounded-full"
//             />
//             <h2 className="text-2xl font-semibold">
//                 {profile.firstName} {profile.lastName}
//             </h2>
//             <p className="text-gray-600">{profile.email}</p>
//             <p className="mt-2">
//                 Status: {profile.isVerified ? 'Verified' : 'Not Verified'}
//             </p>
//             <div className="mt-4">
//                 <button
//                     onClick={() => console.log('Edit Profile')}
//                     className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//                 >
//                     Edit Profile
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default CustomerCareManagerProfile
