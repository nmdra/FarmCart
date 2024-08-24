import React from 'react'
import Sidebar from '../Components/Sidebar' // Import the Sidebar component
import OrderTable from '../Components/OrderTable'

function UserAllOrders() {
    return (
        <div className="relative min-h-screen bg-neutral-100 pr-36 pl-36">
            {/* Floating Sidebar */}
            <Sidebar />

            {/* Recent Orders */}
            <div className="pl-72 p-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-green-400 mt-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        All Orders
                    </h2>
                    <OrderTable rowsPerPage={7} paginateOn={true} />
                </div>
            </div>
        </div>
    )
}

export default UserAllOrders
