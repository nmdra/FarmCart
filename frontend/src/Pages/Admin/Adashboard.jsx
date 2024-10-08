import { useEffect, useState } from 'react'
import axios from '../../axios.jsx'
import Sidebar from '../../Components/Admin/AsideBar.jsx'
import Loading from '../../Components/Loading.jsx'

const Dashboard = () => {
    const [customerCount, setCustomerCount] = useState(0)
    const [staffCount, setStaffCount] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0) // Assuming you have revenue data
    const [loading, setLoading] = useState(true)

    // Fetch dashboard data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                /*  // Fetch customer count
                const customerResponse = await axios.get('/user/count');
                setCustomerCount(customerResponse.data.count);
 */
                // Fetch staff count
                const staffResponse = await axios.get('/staff/count')
                setStaffCount(staffResponse.data.count)

                // Assuming there's an endpoint for total revenue (adjust or remove if unnecessary)
                const revenueResponse = await axios.get('/revenue/total')
                setTotalRevenue(revenueResponse.data.total)
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

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
                            Dashboard
                        </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mb-6">
                        {/*       <Card title="Total Customers" count={customerCount} /> */}
                        <Card title="Total Staff" count={staffCount} />
                        <Card
                            title="Total Revenue"
                            count={`$${totalRevenue.toFixed(2)}`}
                        />
                    </div>

                    {/* Additional dashboard content can be added here */}
                </main>
            </div>
        </div>
    )
}

// Card component to display each metric
const Card = ({ title, count }) => {
    return (
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
                {title}
            </h2>
            <p className="text-3xl font-bold text-green-500">{count}</p>
        </div>
    )
}

export default Dashboard
