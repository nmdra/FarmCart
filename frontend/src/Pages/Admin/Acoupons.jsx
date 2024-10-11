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
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../assets/logo.png'
import { FaDownload } from 'react-icons/fa'

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

    const generateCouponPDF = () => {
        const doc = new jsPDF()
        const img = new Image()

        // Check if the logo is defined correctly
        img.src = logo

        // Ensure the image loads before adding it to the PDF
        img.onload = () => {
            // Add the logo after it's loaded
            doc.addImage(img, 'PNG', 20, 35, 30, 5)

            // Add title below the logo
            doc.setFontSize(15)
            doc.text('Coupon List', 105, 40, null, null, 'center')

            // Prepare the table data
            const tableColumn = ['Id', 'Coupon Code', 'Discount', 'Expiry Date']
            const tableRows = []

            filteredCoupons.forEach((coupon, index) => {
                const couponData = [
                    index + 1,
                    coupon.couponCode,
                    `${coupon.discount}%`, // Assuming discount is a percentage
                    coupon.expiryDate.split('T')[0], // Assuming expiryDate is in ISO format
                ]
                tableRows.push(couponData)
            })

            // Add table to PDF
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 50, // Positioning the table after the logo and title
                styles: {
                    fontSize: 9, // Adjust the table font size as needed
                },
            })

            // Save the generated PDF
            doc.save('coupon-list.pdf')
        }

        // If the logo image doesn't load or isn't available, you can skip adding it:
        img.onerror = () => {
            doc.setFontSize(15)
            doc.text('Coupon List', 105, 40, null, null, 'center')

            const tableColumn = ['Id', 'Coupon Code', 'Discount', 'Expiry Date']
            const tableRows = []

            filteredCoupons.forEach((coupon, index) => {
                const couponData = [
                    index + 1,
                    coupon.couponCode,
                    `${coupon.discount}%`,
                    coupon.expiryDate.split('T')[0],
                ]
                tableRows.push(couponData)
            })

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 50,
                styles: {
                    fontSize: 9,
                },
            })

            doc.save('coupon-list.pdf')
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
                    <div className="flex justify-center items-center mb-8">
                        <h3 className="text-2xl font-semibold text-gray-800">
                            COUPON
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
                    <div className="mt-8 flex justify-end space-x-4">
                        <button
                            onClick={handleAddNewCoupon}
                            className="max-w-5xl px-5 py-3 border-2 rounded-full border-[#99DD05] flex items-center gap-3 hover:bg-[#f5fce6] hover:cursor-pointer transition-transform transform hover:scale-105"
                        >
                            Add Coupon
                        </button>
                        <button
                            onClick={generateCouponPDF}
                            className="max-w-5xl px-5 py-3 border-2 rounded-full border-[#99DD05] flex items-center gap-3 hover:bg-[#f5fce6] hover:cursor-pointer transition-transform transform hover:scale-105"
                        >
                            <FaDownload size={20} />
                            Download
                        </button>
                    </div>

                    {/* Add modal for confirmation if required */}
                </main>
            </div>
        </div>
    )
}

export default Acoupon
