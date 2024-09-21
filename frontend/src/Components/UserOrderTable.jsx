import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Pagination,
} from '@nextui-org/react';
import { Link } from 'react-router-dom'

const UserOrderTable = ({ items, page, pages, setPage }) => {
    return (
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
                <TableColumn>Action</TableColumn> {/* Added Action column */}
                <TableColumn></TableColumn> {/* Added Action column */}
            </TableHeader>
            <TableBody>
                {items.map((item, index) => (
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
                                              : item.orderStatus === 'Pickup'
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
                            <Link
                                to={`/orderStatus?id=${item._id}`}
                                className="text-blue-500 underline"
                            >
                                View Order
                            </Link>
                        </TableCell>{' '}
                        {/* Added View Order link */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default UserOrderTable;
