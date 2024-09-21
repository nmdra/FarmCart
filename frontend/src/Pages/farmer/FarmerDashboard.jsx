import { useEffect, useMemo, useState } from 'react'
import axios from '../../../axios'
import Sidebar from '../../Components/farmer/Farmer_sidebar'
import { useNavigate, Link } from 'react-router-dom'
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
} from '@nextui-org/react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { FaRegEye } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { MdDeleteSweep } from 'react-icons/md'
import DeleteOrder from '../order/DeleteOrder'
import OrderDetailsModal from '../order/OrderDetailsModal'

const Dashboard = () => {
    // State to store farmer details fetched from the backend
    const [farmer, setFarmer] = useState({
        name: '',
        email: '',
        Address: {
            houseNo: '',
            streetName: '',
            city: '',
        },
    })
    const [farmersShop, setFarmersShop] = useState([])
    const navigate = useNavigate()
    console.log(farmer)

    useEffect(() => {
        const getShopByFarmer = async () => {
            try {
                const res = await axios.get(`/orders/get-shop/${farmer._id}`)
                setFarmersShop(res.data)
            } catch (error) {
                console.error('Error fetching farmer details:', error)
            }
        }

        getShopByFarmer()
    }, [farmer])

    // useEffect hook to fetch farmer details when the component mounts
    useEffect(() => {
        const fetchFarmerDetails = async () => {
            try {
                // Retrieve the token from local storage to authenticate the request
                const token = localStorage.getItem('token')
                console.log(token)
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                }

                // Make an API call to fetch the farmer's profile details
                const { data } = await axios.get('/farmers/profile', config)

                // Set the fetched data into the farmer state
                setFarmer(data)
            } catch (error) {
                // Log any errors that occur during the API call
                console.error('Error fetching farmer details:', error)
            }
        }

        fetchFarmerDetails()
    }, []) // Empty dependency array ensures this effect runs only once when the component mounts

    // Render a loading state until farmer details are fetched

    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])

    const [refetch, setRefetch] = useState(false)
    const [page, setPage] = useState(1)
    const [clickOrder, setClickOrder] = useState(null)
    const [clickOrderId, setClickOrderId] = useState(null)
    const [search, setSearch] = useState('')
    const { isOpen: isOpenMoreDetails, onOpenChange: onOpenChangeMoreDetails } =
        useDisclosure()
    const { isOpen: isOpenDelete, onOpenChange: onOpenChangeDelete } =
        useDisclosure()

    const rowsPerPage = 3
    const pages = Math.ceil(orders?.length / rowsPerPage)

    // useEffect(() => {
    //     const user = localStorage.getItem('authUser')

    //     setUser(JSON.parse(user))
    // }, [])

    const filterSales = useMemo(() => {
        return orders.filter((item) =>
            item.orderItems[0].name.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, orders])

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return Array.isArray(filterSales) ? filterSales.slice(start, end) : []
    }, [page, filterSales])

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                farmersShop.forEach(async (shop) => {
                    const res = await axios.get(
                        `http://localhost:5000/api/orders?shopId=${shop._id}`
                    )

                    setOrders((prevOrders) => {
                        const updatedOrders = prevOrders.map((order) => {
                            const matchingOrder = res.data.find(
                                (o) => o._id === order._id
                            )
                            return matchingOrder ? matchingOrder : order
                        })

                        const newOrders = res.data.filter(
                            (newOrder) =>
                                !prevOrders.some(
                                    (order) => order._id === newOrder._id
                                )
                        )

                        return [...updatedOrders, ...newOrders]
                    })

                    // setOrders((pre) => [...pre, ...res.data])

                    setLoading(false)
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchUserOrders()
    }, [refetch, farmersShop])

    const handelChange = async (e, id) => {
        const res = await axios.put(`http://localhost:5000/api/orders/${id}`, {
            orderStatus: e.target.value,
        })

        if (res.status === 200) {
            setRefetch(!refetch)
        }
    }

    const generatePDF = () => {
        const doc = new jsPDF()

        doc.text('Sales Report', 14, 10)

        const tableColumn = [
            'Id',
            'Order Item',
            'Shipping Address',
            'Payment Method',
            'Total Price',
            'Order Status',
        ]

        const tableRows = []

        orders.forEach((item, index) => {
            const rowData = [
                index + 1,
                item.orderItems.map((p) => p.name).join(', '),
                item.shippingAddress.address,
                'Card Payment',
                `LKR ${item.totalPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`,
                item.orderStatus,
            ]
            tableRows.push(rowData)
        })

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        })

        doc.save('orders-report.pdf')
    }

    if (loading) {
        return (
            <div>
                <div className="flex justify-center items-center h-full mt-[100px]">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Main Content Container */}
            <div className="flex flex-1 mt-16">
                {/* Fixed Sidebar */}
                <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-60 p-24 pt-8 overflow-y-auto">
                    <div className="mb-8">
                        {/* Profile and Details Section */}
                        <div className="flex space-x-8 mb-8">
                            {/* Profile Card */}
                            <div className="bg-white p-6 rounded-lg shadow-md w-2/3">
                                <div className="flex flex-col items-center">
                                    <img
                                        className="w-24 h-24 rounded-full object-cover"
                                        src={farmer.image}
                                        alt="Profile"
                                    />
                                    <h2 className="text-xl font-semibold mt-4 text-gray-800">
                                        {farmer.name}
                                    </h2>
                                    <span className="text-gray-800">
                                        Shop Owner
                                    </span>
                                    <Link
                                        to="/farmerprofile"
                                        className="text-green-500 mt-2 inline-block"
                                    >
                                        Edit details
                                    </Link>
                                </div>
                            </div>

                            {/* Details Card */}
                            <div className="bg-white p-6 rounded-lg shadow-md w-2/3 flex flex-col items-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                    Address
                                </h3>
                                <p className="text-gray-800 text-center mb-4">
                                    {`${farmer.Address.houseNo}`} <br />
                                    {`${farmer.Address.streetName}`} <br />
                                    {`${farmer.Address.city}`} <br />
                                    {`${farmer.email}`}
                                </p>
                                <Link
                                    to="/farmerprofile"
                                    className="text-green-500"
                                >
                                    Edit Address
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                My Orders
                            </h3>
                            <div>
                                <Input
                                    isClearable
                                    radius="full"
                                    placeholder="Search orders..."
                                    startContent={<IoSearch />}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div
                                onClick={generatePDF}
                                className=" mt-2 inline-block cursor-pointer bg-red-500 p-2 rounded-md text-white ring-0"
                            >
                                download sales report
                            </div>
                        </div>
                        <Table
                            aria-label="Example table with pagination"
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
                                <TableColumn>Order Item</TableColumn>
                                <TableColumn>Shipping Address</TableColumn>

                                <TableColumn>Total Price</TableColumn>
                                <TableColumn>Deliver Date</TableColumn>
                                <TableColumn>Order Status</TableColumn>
                                <TableColumn>Action</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow
                                        key={item._id}
                                        className="border-b-1"
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            {item.orderItems.map((p) => {
                                                return (
                                                    <div
                                                        key={p.name}
                                                        className="flex gap-2 "
                                                    >
                                                        <img
                                                            src={p.image}
                                                            alt={p.name}
                                                            className="w-10 h-10 mt-1"
                                                        />
                                                        <span>{p.name}</span>
                                                    </div>
                                                )
                                            })}
                                        </TableCell>
                                        <TableCell>
                                            {item.shippingAddress.address}
                                        </TableCell>
                                        <TableCell>
                                            LKR:{' '}
                                            {item.totalPrice.toLocaleString(
                                                'en-US',
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.deliveryDate
                                                ? new Date(
                                                      item.deliveryDate
                                                  ).toLocaleDateString()
                                                : 'Not Set'}
                                        </TableCell>
                                        <TableCell>
                                            <select
                                                className={
                                                    item.orderStatus ===
                                                    'Pending'
                                                        ? 'bg-yellow-500 p-1 rounded-md text-white ring-0'
                                                        : item.orderStatus ===
                                                            'Delivered'
                                                          ? 'bg-green-500 p-1 rounded-md text-white ring-0'
                                                          : item.orderStatus ===
                                                              'Accept'
                                                            ? 'bg-blue-500 p-1 rounded-md text-white ring-0'
                                                            : item.orderStatus ===
                                                                'Ready'
                                                              ? 'bg-purple-500 p-1 rounded-md text-white ring-0'
                                                              : item.orderStatus ===
                                                                  'Pickup'
                                                                ? 'bg-orange-500 p-1 rounded-md text-white ring-0'
                                                                : item.orderStatus ===
                                                                    'OnTheWay'
                                                                  ? 'bg-indigo-500 p-1 rounded-md text-white ring-0'
                                                                  : item.orderStatus ===
                                                                      'Rejected'
                                                                    ? 'bg-red-500 p-1 rounded-md text-white ring-0'
                                                                    : 'bg-gray-500 p-1 rounded-md text-white ring-0'
                                                }
                                                value={item.orderStatus}
                                                onChange={(e) =>
                                                    handelChange(e, item._id)
                                                }
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="Accept">
                                                    Accept
                                                </option>
                                                <option value="Ready">
                                                    Ready
                                                </option>
                                                <option value="Pickup">
                                                    Pickup
                                                </option>
                                                <option value="OnTheWay">
                                                    On the way
                                                </option>
                                                <option value="Delivered">
                                                    Delivered
                                                </option>
                                                <option value="Rejected">
                                                    Rejected
                                                </option>
                                            </select>
                                        </TableCell>
                                        <TableCell className="flex gap-6 justify-center items-center h-16">
                                            <Tooltip
                                                color="danger"
                                                content="Delete supplier"
                                            >
                                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                    <MdDeleteSweep
                                                        onClick={() => {
                                                            setClickOrderId(
                                                                item._id
                                                            )
                                                            onOpenChangeDelete()
                                                        }}
                                                    />
                                                </span>
                                            </Tooltip>{' '}
                                            <Tooltip
                                                color="secondary"
                                                content="More details"
                                            >
                                                <span className="text-lg text-blue-700 cursor-pointer active:opacity-50">
                                                    <FaRegEye
                                                        onClick={() => {
                                                            setClickOrder(item)
                                                            onOpenChangeMoreDetails()
                                                        }}
                                                    />
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <OrderDetailsModal
                            isOpen={isOpenMoreDetails}
                            onOpenChange={onOpenChangeMoreDetails}
                            clickOrder={clickOrder}
                        />
                        <DeleteOrder
                            isOpen={isOpenDelete}
                            onOpenChange={onOpenChangeDelete}
                            orderId={clickOrderId}
                            setOrders={setOrders}
                            setClickOrderId={setClickOrderId}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
