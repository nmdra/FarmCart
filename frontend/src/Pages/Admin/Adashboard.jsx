import { useEffect, useState } from 'react'
import axios from '../../axios.jsx'
import Sidebar from '../../Components/Admin/AsideBar.jsx'
import Loading from '../../Components/Loading.jsx'
import DailyOrdersChart from '../../Components/Admin/DailyOrdersChart.jsx'
import {
    FaUsers,
    FaUserTie,
    FaTags,
    FaTruck,
    FaStore,
    FaDollarSign,
    FaArrowDown,
    FaArrowUp,
} from 'react-icons/fa'

const Dashboard = () => {
    const [customerCount, setCustomerCount] = useState(0)
    const [farmercount, setFarmerCount] = useState(0)
    const [driverCount, setDriverCount] = useState(0)
    const [staffCount, setStaffCount] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState({ today: 0, yesterday: 0 }) // Adjusted totalRevenue structure
    const [loading, setLoading] = useState(true)
    const [couponCount, setCouponCount] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // Fetch staff count
                const staffResponse = await axios.get('/staff/count')
                setStaffCount(staffResponse.data.count)

                // Fetch coupon count
                const couponResponse = await axios.get('/coupon/count')
                setCouponCount(couponResponse.data.count)

                // Fetch customer count
                const customerResponse = await axios.get('/customers/count')
                setCustomerCount(customerResponse.data.count)

                // Fetch farmer count
                const farmerResponse = await axios.get('/farmers/count')
                setFarmerCount(farmerResponse.data.count)

                // Fetch driver count
                const driverResponse = await axios.get('/drivers/count')
                setDriverCount(driverResponse.data.count)

                // Fetch total revenue for today and yesterday
                const revenueResponse = await axios.get('/orders/revenue')
                setTotalRevenue(revenueResponse.data)
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const revenueDifference = totalRevenue.today - totalRevenue.yesterday
    const isIncreased = revenueDifference > 0

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
                        <h3 className="text-lg font-semibold text-gray-800 text-center">
                            DASHBOARD
                        </h3>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mb-6">
                        {/* Total Staff */}
                        <Card
                            title={
                                <>
                                    <FaUserTie className="inline-block mr-2" />{' '}
                                    Total Staff
                                </>
                            }
                            count={staffCount}
                        />

                        {/* Total Coupon */}
                        <Card
                            title={
                                <>
                                    <FaTags className="inline-block mr-2" />{' '}
                                    Total Coupon
                                </>
                            }
                            count={couponCount}
                        />

                        {/* Total Customers */}
                        <Card
                            title={
                                <>
                                    <FaUsers className="inline-block mr-2" />{' '}
                                    Total Customers
                                </>
                            }
                            count={customerCount}
                        />

                        {/* Total Drivers */}
                        <Card
                            title={
                                <>
                                    <FaTruck className="inline-block mr-2" />{' '}
                                    Total Drivers
                                </>
                            }
                            count={driverCount}
                        />

                        {/* Total Farmers */}
                        <Card
                            title={
                                <>
                                    <FaStore className="inline-block mr-2" />{' '}
                                    Total Farmers
                                </>
                            }
                            count={farmercount}
                        />

                        {/* Total Revenue with today's and yesterday's values */}
                        <Card
                            title={
                                <>
                                    <FaDollarSign className="inline-block mr-2" />{' '}
                                    Total Revenue
                                </>
                            }
                            count={
                                <>
                                    Rs. {totalRevenue.today.toFixed(2)}{' '}
                                    {isIncreased ? (
                                        <FaArrowUp className="inline-block text-green-500" />
                                    ) : (
                                        <FaArrowDown className="inline-block text-red-500" />
                                    )}
                                </>
                            }
                            subtitle={
                                <>
                                    Yesterday:{' '}
                                    <span className="text-gray-500">
                                        Rs. {totalRevenue.yesterday.toFixed(2)}
                                    </span>
                                </>
                            }
                        />
                    </div>

                    {/* Additional dashboard content can be added here */}
                    <DailyOrdersChart />
                </main>
            </div>
        </div>
    )
}

// Card component to display each metric
const Card = ({ title, count, subtitle }) => {
    return (
        <div className="bg-white p-6 shadow-md rounded-lg text-center border-2 border-green-500 hover:bg-lime-100 transition-colors duration-300">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
                {title}
            </h2>
            <p className="text-3xl font-bold text-green-500">{count}</p>
            {subtitle && (
                <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
            )}
        </div>
    )
}

export default Dashboard
