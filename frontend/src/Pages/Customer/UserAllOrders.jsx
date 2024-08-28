import React from 'react'
import OrderTable from '../../Components/OrderTable'

function UserAllOrders() {
    return (
        <div className="relative min-h-screen bg-neutral-100 pr-18 pl-18">
            {/* Recent Orders */}
            <div className="p-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-green-400 mt-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        All Orders
                    </h2>
                    <OrderTable
                        rowsPerPage={10}
                        paginateOn={true}
                        emptyRowMsg="No orders found!"
                        enableSearch={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserAllOrders
