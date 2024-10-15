import SupportTicketCharts from '../../../Components/Help/dashboard/SupportTicketCharts'
import SupportTicketFullViewTable from '../../../Components/Help/dashboard/SupportTicketFullViewTable'
import CCMDashboardNavBar from '../../../Components/Help/dashboard/CCMDashboardNavBar'
import { Link } from 'react-router-dom'

const SupportTicketDashboardPage = () => {
    return (
        <div>
            <CCMDashboardNavBar />
            <div className="pt-10 mx-auto max-w-7xl ">
                <button className="px-10 py-3 font-semibold text-white bg-green-500 rounded ">
                    <Link to="/help/dashboard/supportticketfullview">
                        Download Analytics Report
                    </Link>
                </button>
            </div>
            <div className="py-10 ">
                <SupportTicketCharts />
            </div>
            <div className="py-10 mx-auto max-w-7xl">
                <h1 className="text-4xl font-semibold ">All Support Tickets</h1>
                <SupportTicketFullViewTable />
            </div>
        </div>
    )
}

export default SupportTicketDashboardPage
