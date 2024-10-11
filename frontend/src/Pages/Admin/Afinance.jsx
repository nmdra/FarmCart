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
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../assets/logo.PNG';
import { FaDownload } from 'react-icons/fa';


const Finance = () => {
    const [staffMembers, setStaffMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [refetch, setRefetch] = useState(false)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')

    const rowsPerPage = 4
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

    // PDF Generation
    const generatePDF = () => {
        const doc = new jsPDF()
        const img = new Image();
        img.src = logo;
        // Add logo
        doc.addImage(img, 'PNG', 20, 35, 30, 5); // Adjust the X, Y, width, and height as needed // Adjust x, y, width, height as needed

        // Add title below the logo
        doc.setFontSize(15)
        doc.text('Staff List', 105, 40, null, null, 'center') // Centered below logo

        // Prepare the table data
        const tableColumn = ['Id', 'Full Name','NIC','Email','Birth Day','Address','Role']
        const tableRows = []

        filteredStaff.forEach((member, index) => {
            const memberData = [
                index + 1,
                `${member.firstName} ${member.lastName}`,
                member.nic,
                member.email,
                member.birthday.split('T')[0],
                `${member.Address.home} ${member.Address.street} ${member.Address.city}`,
                member.role
                
            ]
            tableRows.push(memberData)
        })

        // Add table to PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 50, // Positioning the table after the logo and title
            styles: {
                fontSize: 9 // Adjust this value to make the table content smaller
            }
        })

        doc.save('staff-list.pdf')
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
                <div className="flex justify-center mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800">
                         STAFF
                    </h3>
                </div>

                <div className="w-96 mb-6">
    <Input
        isClearable
        radius="full"
        placeholder="Search staff..."
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-full border-[#99DD05] border-2 focus:border-[#99DD05] focus:ring-[#99DD05] placeholder-green-500" // Add custom classes here
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
                            <TableColumn>NIC</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>Birthday</TableColumn>
                            <TableColumn>Address</TableColumn>
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
                                    <TableCell>{member.nic}</TableCell>
                                    <TableCell>{member.email}</TableCell>
                                    <TableCell>{member.birthday.split('T')[0]}</TableCell>
                                    <TableCell>{`${member.Address.home} ${member.Address.street} ${member.Address.city}`}</TableCell>
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
                    <div className="flex justify-end space-x-4 mt-5">
                    <button
        onClick={handleAddNewStaff}
        className="max-w-5xl px-5 py-3 border-2 rounded-full border-[#99DD05] flex items-center gap-3 hover:bg-[#f5fce6] hover:cursor-pointer transition-transform transform hover:scale-105"
    >
        Add New Staff
    </button>
    <button
        onClick={generatePDF}
        className="max-w-5xl px-5 py-3 border-2 rounded-full border-[#99DD05] flex items-center gap-3 hover:bg-[#f5fce6] hover:cursor-pointer transition-transform transform hover:scale-105"
    >
        <FaDownload size={20} />
        Export Staff list
    </button>

</div>



                </main>
            </div>
        </div>
    )
}

export default Finance

