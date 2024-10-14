import FeedbackTableView from './FeedbackTableView'
import OverviewCards from './OverviewCards'
import SupportTicketsViewTable from './SupportTicketsViewTable'

const Overview = () => {
    return (
        <div>
            <OverviewCards />
            <div className="p-3 mt-6 border rounded-lg">
                <SupportTicketsViewTable />
            </div>
            <div className="p-3 mt-6 border rounded-lg">
                <FeedbackTableView />
            </div>
        </div>
    )
}

export default Overview
