import SupportTicketCharts from '../../../Components/Help/dashboard/SupportTicketCharts'
import SupportTicketFullViewTable from '../../../Components/Help/dashboard/SupportTicketFullViewTable'
import CCMDashboardNavBar from '../../../Components/Help/dashboard/CCMDashboardNavBar'

const SupportTicketDashboardPage = () => {
    return (
        <div>
            <CCMDashboardNavBar />
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
