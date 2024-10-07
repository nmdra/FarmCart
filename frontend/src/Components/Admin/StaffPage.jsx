import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'

const StaffPage = () => {
    const [staff, setStaff] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchStaff()
    }, [])

    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/staff')
            setStaff(response.data)
        } catch (error) {
            console.error('Error fetching staff:', error)
        }
    }

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/staff/search?name=${searchTerm}`
            )
            setStaff(response.data)
        } catch (error) {
            console.error('Error searching staff:', error)
        }
    }

    const handleEditClick = (staffMember) => {
        navigate('/staff/create', {
            state: { editMode: true, staffToEdit: staffMember },
        })
    }

    const handleDeleteClick = async (staffId) => {
        try {
            await axios.delete(`http://localhost:3000/api/staff/${staffId}`)
            fetchStaff()
        } catch (error) {
            console.error('Error deleting staff member:', error)
        }
    }

    const generatePDF = () => {
        const doc = new jsPDF()

        doc.setFontSize(22)
        doc.setFont('helvetica', 'bold')
        doc.text('Staff List', 105, 20, null, null, 'center')

        doc.setLineWidth(0.5)
        doc.line(20, 25, 190, 25)

        doc.setFontSize(12)
        doc.setFont('helvetica', 'normal')

        const headers = ['NIC', 'Name', 'Email', 'Birthday', 'Phone']

        const data = staff.map((staffMember) => [
            staffMember.nic,
            staffMember.name,
            staffMember.email,
            staffMember.birthday,
            staffMember.phone,
        ])

        const columnWidths = [30, 40, 50, 30, 30]
        let yPosition = 35

        headers.forEach((header, i) => {
            doc.setFont('helvetica', 'bold')
            doc.text(header, 20 + i * columnWidths[i], yPosition)
        })

        doc.line(20, yPosition + 2, 190, yPosition + 2)
        yPosition += 8

        data.forEach((row) => {
            row.forEach((text, i) => {
                doc.setFont('helvetica', 'normal')
                doc.text(String(text), 20 + i * columnWidths[i], yPosition)
            })
            yPosition += 8
        })

        doc.setFontSize(10)
        doc.setFont('helvetica', 'italic')
        doc.text(
            'Generated on: ' + new Date().toLocaleString(),
            20,
            yPosition + 10
        )

        doc.save('staff-list.pdf')
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Staff Members</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name"
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                >
                    Search
                </button>
            </div>

            <div className="flex justify-between mb-4">
                <button
                    onClick={() => navigate('create')}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                >
                    Add Staff
                </button>
                <button
                    onClick={generatePDF}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Download PDF
                </button>
            </div>
            <table className="w-full bg-white shadow-md rounded mb-4 border-2 border-lime-500">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-3 text-left">NIC</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Birthday</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.length > 0 ? (
                        staff.map((staffMember) => (
                            <tr
                                key={staffMember._id}
                                className="border-t border-lime-500"
                            >
                                <td className="p-3">{staffMember.nic}</td>
                                <td className="p-3">{staffMember.name}</td>
                                <td className="p-3">{staffMember.email}</td>
                                <td className="p-3">{staffMember.birthday}</td>
                                <td className="p-3">{staffMember.phone}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() =>
                                            handleEditClick(staffMember)
                                        }
                                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteClick(staffMember._id)
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="p-3 text-center">
                                No staff members found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default StaffPage
