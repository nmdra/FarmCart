import React, { useState, useEffect } from 'react'
import axios from '../../axios' // Ensure correct path to axios
import { useNavigate } from 'react-router-dom'
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar' // Sidebar component
import Loading from '../../Components/Loading'

const DLALLdrivers = () => {
    const [drivers, setDrivers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)

    const [filteredDrivers, setFilteredDrivers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [showAvailableOnly, setShowAvailableOnly] = useState(false) // New state for available drivers filter
    const rowsPerPage = 30 // Limit rows to 30 per page
    const navigate = useNavigate()

    // Fetch all drivers when the component mounts
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const { data } = await axios.get('/drivers/drivers') // API call to get all drivers
                console.log('Fetched data:', data)
                setDrivers(data)
                setFilteredDrivers(data)
                setTotalPages(Math.ceil(data.length / rowsPerPage)) // Set total pages based on rows per page
                setLoading(false)
            } catch (error) {
                console.error('Error fetching drivers:', error)
                setLoading(false)
            }
        }

        fetchDrivers()
    }, [])

    // Handle search input change and filter drivers
    const handleSearch = (event) => {
        const searchValue = event.target.value
        setSearchTerm(searchValue)

        if (searchValue === '') {
            setFilteredDrivers(drivers) // Reset to all drivers if search is cleared
        } else {
            const filtered = drivers.filter(
                (driver) =>
                    `${driver.firstName} ${driver.lastName}`
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    driver.email
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    driver.phone.includes(searchValue) ||
                    driver.vehicleNumber
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    driver.driverID
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    driver.vehicleType
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    (driver.isAvailable ? 'available' : 'unavailable').includes(
                        searchValue.toLowerCase()
                    )
            )
            setFilteredDrivers(filtered)
            setTotalPages(Math.ceil(filtered.length / rowsPerPage)) // Update total pages after filtering
            setCurrentPage(1) // Reset to first page when search changes
        }
    }

    // Handle showing only available drivers
    const toggleAvailableDrivers = () => {
        setShowAvailableOnly(!showAvailableOnly) // Toggle filter state
        if (!showAvailableOnly) {
            const availableDrivers = drivers.filter(
                (driver) => driver.isAvailable
            )
            setFilteredDrivers(availableDrivers)
        } else {
            setFilteredDrivers(drivers) // Show all drivers when toggled off
        }
        setCurrentPage(1) // Reset to first page
        setTotalPages(Math.ceil(filteredDrivers.length / rowsPerPage)) // Recalculate total pages
    }

    // Pagination logic
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const currentRows = filteredDrivers.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    const handleViewDriver = (id) => {
        navigate(`/manager/view-driver/${id}`) // Redirect to DLViewDriver page with the driver ID
    }

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DLmanageSidebar />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        All Drivers
                    </h2>

                    {/* Search box */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search drivers by name, email, phone, driver ID, vehicle type, availability"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Available drivers toggle button */}
                    <div className="mb-4">
                        <button
                            onClick={toggleAvailableDrivers}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            {showAvailableOnly
                                ? 'Show All Drivers'
                                : 'Show Available Drivers Only'}
                        </button>
                    </div>

                    {/* Drivers table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-3 border text-left">
                                        #
                                    </th>
                                    <th className="px-6 py-3 border text-left">
                                        Driver ID
                                    </th>
                                    <th className="px-6 py-3 border text-left">
                                        Full Name
                                    </th>
                                    <th className="px-6 py-3 border text-left">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 border text-left">
                                        Phone
                                    </th>
                                    <th className="px-6 py-3 border text-left">
                                        Vehicle Type
                                    </th>
                                    <th className="px-6 py-3 border text-left">
                                        Vehicle Number
                                    </th>
                                    <th className="px-6 py-3 border text-left">
                                        Availability
                                    </th>
                                    <th className="px-6 py-3 border text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.length > 0 ? (
                                    currentRows.map((driver, index) => (
                                        <tr
                                            key={driver._id}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="px-6 py-4 border">
                                                {(currentPage - 1) *
                                                    rowsPerPage +
                                                    index +
                                                    1}
                                            </td>
                                            <td className="px-6 py-4 border">
                                                {driver.driverID}
                                            </td>
                                            <td className="px-6 py-4 border">{`${driver.firstName} ${driver.lastName}`}</td>
                                            <td className="px-6 py-4 border">
                                                {driver.email}
                                            </td>
                                            <td className="px-6 py-4 border">
                                                {driver.phone}
                                            </td>
                                            <td className="px-6 py-4 border">
                                                {driver.vehicleType}
                                            </td>
                                            <td className="px-6 py-4 border">
                                                {driver.vehicleNumber}
                                            </td>
                                            <td className="px-6 py-4 border">
                                                <span
                                                    className={`px-2 py-1 text-sm rounded ${
                                                        driver.isAvailable
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    {driver.isAvailable
                                                        ? 'Available'
                                                        : 'Unavailable'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 border">
                                                <button
                                                    onClick={() =>
                                                        handleViewDriver(
                                                            driver._id
                                                        )
                                                    } // Handle View button click
                                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="px-6 py-4 border text-center text-gray-600"
                                        >
                                            No drivers found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination controls */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Previous
                        </button>
                        <span className="text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DLALLdrivers
