import { useEffect, useState, useMemo } from 'react'
import axios from '../../axios'
import Sidebar from '../../Components/Admin/AsideBar'
import { FaRegEye } from 'react-icons/fa'
import { MdDeleteSweep } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
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
import Swal from 'sweetalert2'

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../assets/logo.png'
import { FaDownload } from 'react-icons/fa'

const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const rowsPerPage = 3
    const navigate = useNavigate()

    // Fetch customers
    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get('/customers') // Adjust endpoint as necessary
                setCustomers(data)
            } catch (error) {
                console.error('Error fetching customers:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCustomers()
    }, [])

    // Search functionality
    const filteredCustomers = useMemo(() => {
        return customers.filter((customer) =>
            `${customer.firstname} ${customer.lastname}`
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    }, [search, customers])

    // Pagination
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return filteredCustomers.slice(start, end)
    }, [page, filteredCustomers])

    const pages = Math.ceil(filteredCustomers.length / rowsPerPage)

    const handleDeleteCustomer = async (customerId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this customer?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        })

        if (result.isConfirmed) {
            try {
                await axios.delete(`/customers/${customerId}`) // Adjust the endpoint
                Swal.fire('Deleted!', 'Customer has been deleted.', 'success')
                setCustomers(customers.filter((c) => c._id !== customerId))
            } catch (error) {
                console.error('Error deleting customer:', error)
                Swal.fire(
                    'Error!',
                    'There was an error deleting the customer.',
                    'error'
                )
            }
        }
    }

    const handleEditCustomer = (customerId) => {
        navigate(`/updateCustomer/${customerId}`)
    }

    const generateCustomerPDF = () => {
        const doc = new jsPDF()
        const img = new Image()
        img.src = logo // Assuming you have the logo stored or imported as "logo"

        // Add logo to PDF
        doc.addImage(img, 'PNG', 20, 35, 30, 5) // Adjust position (x, y, width, height) as needed

        // Add title below the logo
        doc.setFontSize(15)
        doc.text('Customer List', 105, 40, null, null, 'center') // Centered below logo

        // Prepare the table data
        const tableColumn = [
            'Id',
            'First Name',
            'Last Name',
            'Email',
            'Membership',
            'Contact Number',
        ]
        const tableRows = []

        // Loop through filtered customer data and format it for the table
        filteredCustomers.forEach((customer, index) => {
            const customerData = [
                index + 1,
                customer.firstname,
                customer.lastname,
                customer.email,
                customer.membershipType, // Assuming membershipType exists in customer data
                customer.contactNumber, // Assuming contactNumber exists in customer data
            ]
            tableRows.push(customerData)
        })

        // Add table to PDF
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 50, // Positioning the table after the logo and title
            styles: {
                fontSize: 9, // Adjust this value to make the table content smaller
            },
        })

        // Save the PDF
        doc.save('customer-list.pdf')
    }

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <span>Loading...</span>
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
                            CUSTOMERS
                        </h3>
                    </div>

                    <div className="w-96 mb-6">
                        <Input
                            isClearable
                            radius="full"
                            placeholder="Search customers..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-full border-[#99DD05] border-2 focus:border-[#99DD05] focus:ring-[#99DD05] placeholder-green-500"
                        />
                    </div>

                    <Table
                        aria-label="Customers Table"
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
                            <TableColumn>First Name</TableColumn>
                            <TableColumn>Last Name</TableColumn>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>Action</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {items.map((customer, index) => (
                                <TableRow key={customer._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{customer.firstname}</TableCell>
                                    <TableCell>{customer.lastname}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell className="flex gap-6 justify-center items-center h-16">
                                        <Tooltip
                                            color="warning"
                                            content="Edit customer"
                                        ></Tooltip>
                                        <Tooltip
                                            color="danger"
                                            content="Delete customer"
                                        >
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <MdDeleteSweep
                                                    onClick={() => {
                                                        handleDeleteCustomer(
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
                            onClick={() => navigate('/addCustomer')}
                            className="max-w-5xl px-5 py-3 border-2 rounded-full border-[#99DD05] flex items-center gap-3 hover:bg-[#f5fce6] hover:cursor-pointer transition-transform transform hover:scale-105"
                        >
                            Add New Customer
                        </button>
                        <button
                            onClick={generateCustomerPDF}
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

export default CustomerList
