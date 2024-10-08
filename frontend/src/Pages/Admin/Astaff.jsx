import { useEffect, useMemo, useState } from 'react'
import axios from '../../axios'
import Sidebar from '../../Components/Admin/AsideBar.jsx'
import { useNavigate } from 'react-router-dom'
import { useDisclosure } from '@nextui-org/react'
import {
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    Button,
} from '@nextui-org/react'
import { FaRegEye } from 'react-icons/fa'
import { MdDeleteSweep } from 'react-icons/md'
import Loading from '../../Components/Loading'
import Swal from 'sweetalert2'

const Staff = () => {
    const [staffMembers, setStaffMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [refetch, setRefetch] = useState(false)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')

    const rowsPerPage = 5
    const navigate = useNavigate()

    // Fetch staff members
    useEffect(() => {
        const fetchStaffMembers = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get('/staff')
                setStaffMembers(data)
            } catch (error) {
                console.error('Error fetching staff members:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStaffMembers()
    }, [refetch])

    // Search functionality
    const filteredStaff = useMemo(() => {
        return staffMembers.filter((member) =>
            `${member.firstName} ${member.lastName}`
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    }, [search, staffMembers])

    // Pagination
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return filteredStaff.slice(start, end)
    }, [page, filteredStaff])

    const pages = Math.ceil(filteredStaff.length / rowsPerPage)

    const handleDeleteStaff = async (staffId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this staff member? This process cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        })

        if (result.isConfirmed) {
            try {
                await axios.delete(`/staff/${staffId}`)
                Swal.fire(
                    'Deleted!',
                    'Staff member has been deleted.',
                    'success'
                )
                setRefetch((prev) => !prev)
            } catch (error) {
                console.error('Error deleting staff:', error)
                Swal.fire(
                    'Error!',
                    'There was an error deleting the staff member.',
                    'error'
                )
            }
        }
    }

    const handleAddNewStaff = () => {
        navigate('/AddStaff')
    }

    const handleEditStaff = (memberId) => {
        navigate(`/updatestaff/${memberId}`)
    }

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="flex flex-1 mt-16">
                <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                    <Sidebar />
                </aside>

                <main className="flex-1 ml-60 p-24 pt-8 overflow-y-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Staff Members
                        </h3>
                        <button
                            onClick={handleAddNewStaff}
                            className="bg-green-500 text-white hover:bg-green-600 font-semibold py-2 px-4 rounded text-center"
                        >
                            Add New Staff
                        </button>
                    </div>
                    <div className="w-96 mb-6">
                        <Input
                            isClearable
                            radius="full"
                            placeholder="Search staff..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <Table
                        aria-label="Staff Members Table"
                        bottomContent={
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        }
                    >
                        <TableHeader>
                            <TableColumn>Id</TableColumn>
                            <TableColumn>Full Name</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>Role</TableColumn>
                            <TableColumn>Action</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {items.map((member, index) => (
                                <TableRow
                                    key={member._id}
                                    className="border-b-1"
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{`${member.firstName} ${member.lastName}`}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell className="flex gap-6 justify-center items-center h-16">
                                        <Tooltip
                                            color="secondary"
                                            content="More details"
                                        >
                                            <span className="text-lg text-blue-700 cursor-pointer active:opacity-50">
                                                <FaRegEye
                                                    onClick={() => {
                                                        // Open the modal for more details if implemented
                                                    }}
                                                />
                                            </span>
                                        </Tooltip>
                                        <Tooltip
                                            color="warning"
                                            content="Edit staff"
                                        >
                                            <span className="text-lg text-warning cursor-pointer active:opacity-50">
                                                <Button
                                                    onClick={() =>
                                                        handleEditStaff(
                                                            member._id
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            </span>
                                        </Tooltip>
                                        <Tooltip
                                            color="danger"
                                            content="Delete staff"
                                        >
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <MdDeleteSweep
                                                    onClick={() => {
                                                        handleDeleteStaff(
                                                            member._id
                                                        )
                                                    }}
                                                />
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Add modal for confirmation if required */}
                </main>
            </div>
        </div>
    )
}

export default Staff
