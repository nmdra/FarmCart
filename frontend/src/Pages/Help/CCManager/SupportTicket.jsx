import SupportTicketCharts from '../../../Components/Help/dashboard/SupportTicketCharts'
import SupportTicketFullViewTable from '../../../Components/Help/dashboard/SupportTicketFullViewTable'

const SupportTicketDashboardPage = () => {
    return (
        <div>
            <div className="py-10 mx-auto max-w-7xl">
                <SupportTicketFullViewTable />
            </div>
            <SupportTicketCharts />
        </div>
    )
}

export default SupportTicketDashboardPage
