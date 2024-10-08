import { useEffect, useState, useMemo } from 'react'
import axios from '../../axios'
import Sidebar from '../../Components/Admin/AsideBar'
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
        return customers.filter(
            (customer) =>
                customer.firstname
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                customer.lastname.toLowerCase().includes(search.toLowerCase())
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

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <Sidebar />
            </aside>
            <main className="flex-1 ml-64 p-24 pt-8">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-semibold">Customers</h3>
                    <Input
                        isClearable
                        placeholder="Search customers..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Table aria-label="Customers Table">
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
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleEditCustomer(customer._id)
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="danger"
                                        onClick={() =>
                                            handleDeleteCustomer(customer._id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination
                    isCompact
                    showControls
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                />
            </main>
        </div>
    )
}

export default CustomerList
