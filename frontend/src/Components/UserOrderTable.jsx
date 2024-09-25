import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Pagination,
    Input,
} from '@nextui-org/react'
import { Link } from 'react-router-dom'

const UserOrderTable = ({ items, page, pages, setPage }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    const handleFilterClick = (status) => {
        setStatusFilter(status)
    }

    const filteredItems = items.filter((item) => {
        const matchesStatus = statusFilter
            ? item.orderStatus === statusFilter
            : true
        const matchesSearch =
            item.totalPrice.toString().includes(searchQuery) ||
            item.orderItems.some((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) ||
            item.orderStatus.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesStatus && matchesSearch
    })

    return (
        <>
            {/* Search and Filter Section */}
            <div className="mb-4">
                <Input
                    clearable
                    placeholder="Search by order status, price, or item"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
                {[
                    'Pending',
                    'Delivered',
                    'Accept',
                    'Ready',
                    'Pickup',
                    'OnTheWay',
                    'Rejected',
                ].map((status) => (
                    <button
                        key={status}
                        onClick={() => handleFilterClick(status)}
                        className={`px-3 py-1 rounded-md text-sm font-semibold ${
                            statusFilter === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {status}
                    </button>
                ))}
                <button
                    onClick={() => setStatusFilter('')}
                    className="px-3 py-1 rounded-md text-sm font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                    All
                </button>
            </div>

            {/* Orders Table */}
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
                    <TableColumn>#Id</TableColumn>
                    <TableColumn>Order Item</TableColumn>
                    <TableColumn>Total Price</TableColumn>
                    <TableColumn>Deliver Date</TableColumn>
                    <TableColumn>Order Status</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    {filteredItems.map((item, index) => (
                        <TableRow key={item._id} className="border-b-1">
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                {item.orderItems.map((p) => (
                                    <div key={p.name} className="flex gap-2 ">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-10 h-10 mt-1"
                                        />
                                        <span>{p.name}</span>
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>
                                LKR:{' '}
                                {item.totalPrice.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
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
                                            ? 'bg-yellow-500 p-1 rounded-md text-white ring-0'
                                            : item.orderStatus === 'Delivered'
                                              ? 'bg-green-500 p-1 rounded-md text-white ring-0'
                                              : item.orderStatus === 'Accept'
                                                ? 'bg-blue-500 p-1 rounded-md text-white ring-0'
                                                : item.orderStatus === 'Ready'
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
                                >
                                    {item.orderStatus}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Link to={`/orderStatus?id=${item._id}`}>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded-md">
                                        View Order
                                    </button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default UserOrderTable
