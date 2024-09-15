import React, { useEffect, useMemo, useState } from 'react'
import OrderTable from '../../Components/OrderTable'
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'

function UserAllOrders() {
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const [user, setUser] = useState({})

    const rowsPerPage = 3
    const pages = Math.ceil(orders?.length / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return Array.isArray(orders) ? orders.slice(start, end) : []
    }, [page, orders])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {}
        setUser(user)
    }, [])

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/orders/get-user-orders/${user._id}`
                )
                const data = await res.json()

                setOrders(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUserOrders()
    }, [user])

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
        <div className="relative min-h-screen bg-neutral-100 pr-18 pl-18">
            {/* Recent Orders */}
            <div className="p-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-green-400 mt-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        All Orders
                    </h2>
                    {/* <OrderTable
                        rowsPerPage={10}
                        paginateOn={true}
                        emptyRowMsg="No orders found!"
                        enableSearch={true}
                    /> */}
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
                        </TableHeader>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={item._id} className="border-b-1">
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
                                        <span
                                            className={
                                                item.orderStatus === 'Pending'
                                                    ? 'text-yellow-500 p-1 rounded-md font-bold ring-0'
                                                    : item.orderStatus ===
                                                        'Delivered'
                                                      ? 'text-green-500 p-1 rounded-md font-bold ring-0'
                                                      : item.orderStatus ===
                                                          'Accept'
                                                        ? 'text-blue-500 p-1 rounded-md font-bold ring-0'
                                                        : 'text-red-500 p-1 rounded-md font-bold ring-0'
                                            }
                                        >
                                            {item.orderStatus}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default UserAllOrders
