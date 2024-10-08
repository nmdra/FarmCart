import { useEffect, useMemo, useState } from 'react'
import axios from '../../axios.jsx'
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
    Modal,
} from '@nextui-org/react'
import { FaRegEye } from 'react-icons/fa'
import { MdDeleteSweep } from 'react-icons/md'
import Loading from '../../Components/Loading.jsx'
import Swal from 'sweetalert2'

const Acoupon = () => {
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(true)
    const [refetch, setRefetch] = useState(false)
    const [page, setPage] = useState(1)
    const [clickCoupon, setClickCoupon] = useState(null)
    const [search, setSearch] = useState('')
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [updatedCoupon, setUpdatedCoupon] = useState({
        couponCode: '',
        discount: '',
        expiryDate: '', // Initialize with an empty string or default date
    })

    const rowsPerPage = 3
    const navigate = useNavigate()

    // Fetch coupons
    useEffect(() => {
        const fetchCoupons = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get('/coupon') // Adjust the endpoint as necessary
                setCoupons(data)
            } catch (error) {
                console.error('Error fetching coupons:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCoupons()
    }, [refetch])

    // Search functionality
    const filteredCoupons = useMemo(() => {
        return coupons.filter((coupon) =>
            coupon.couponCode.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, coupons])

    // Pagination
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return filteredCoupons.slice(start, end)
    }, [page, filteredCoupons])

    const pages = Math.ceil(filteredCoupons.length / rowsPerPage)

    const handleDeleteCoupon = async (couponId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this coupon? This process cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
        })

        if (result.isConfirmed) {
            try {
                await axios.delete(`/coupon/${couponId}`) // Adjust the endpoint as necessary
                Swal.fire('Deleted!', 'Coupon has been deleted.', 'success')
                setRefetch((prev) => !prev)
            } catch (error) {
                console.error('Error deleting coupon:', error)
                Swal.fire(
                    'Error!',
                    'There was an error deleting the coupon.',
                    'error'
                )
            }
        }
    }

    const handleAddNewCoupon = () => {
        navigate('/addcoupons') // Adjust to your route for adding coupons
    }

    const handleEditCoupon = (couponId) => {
        navigate(`/updateCoupon/${couponId}`)
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
                            Coupons
                        </h3>
                        <button
                            onClick={handleAddNewCoupon}
                            className="bg-green-500 text-white hover:bg-green-600 font-semibold py-2 px-4 rounded text-center"
                        >
                            Add New Coupon
                        </button>
                    </div>
                    <div className="w-96 mb-6">
                        <Input
                            isClearable
                            radius="full"
                            placeholder="Search coupons..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <Table
                        aria-label="Coupons Table"
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
                            <TableColumn>Coupon Code</TableColumn>
                            <TableColumn>Discount</TableColumn>
                            <TableColumn>Expiry Date</TableColumn>
                            <TableColumn>Action</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {items.map((coupon, index) => (
                                <TableRow
                                    key={coupon._id}
                                    className="border-b-1"
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{coupon.couponCode}</TableCell>
                                    <TableCell>{coupon.discount}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            coupon.expiryDate
                                        ).toLocaleDateString()}
                                    </TableCell>
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
                                            content="Edit coupon"
                                        >
                                            <span className="text-lg text-warning cursor-pointer active:opacity-50">
                                                <Button
                                                    onClick={() =>
                                                        handleEditCoupon(
                                                            coupon._id
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                            </span>
                                        </Tooltip>
                                        <Tooltip
                                            color="danger"
                                            content="Delete coupon"
                                        >
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <MdDeleteSweep
                                                    onClick={() => {
                                                        handleDeleteCoupon(
                                                            coupon._id
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

export default Acoupon
