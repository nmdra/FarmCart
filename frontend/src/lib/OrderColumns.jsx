// OrderColumns.jsx
import React from 'react';

export const OrderColumns = [
    { 
        Header: 'Order ID', 
        accessor: row => `#${row._id.$oid.substring(16, 24)}`, // Prepend # and limit to 8 characters
        id: 'orderId' 
    },
    { 
        Header: 'Date', 
        accessor: row => new Date(row.createdAt).toLocaleDateString(), 
        id: 'date' 
    },
    { 
        Header: 'Items Count', 
        accessor: row => row.orderItems.length, 
        id: 'itemsCount' 
    },
    { 
        Header: 'Total Amount', 
        accessor: row => `Rs. ${row.totalAmount.toFixed(2)}`, 
        id: 'totalAmount' 
    },
    { 
        Header: 'Status', 
        accessor: 'orderStatus', 
        id: 'status' 
    },
    {
        Header: 'Details',
        accessor: row => row._id.$oid,
        id: 'details',
        Cell: ({ value }) => (
            <a href={`/orders/${value}`} className="text-green-500 hover:text-green-700">
                View Details
            </a>
        )
    },
];
