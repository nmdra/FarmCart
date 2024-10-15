import { Link } from 'react-router-dom'
import FeedbackOverviewTable from './FeedbackOverviewTable'
import SupportTicketOverviewTable from './SupportTicketOverviewTable'
import FeedbackCharts from './FeedbackCharts'

const Overview = () => {
    return (
        <div>
            <div className="pb-[5rem] border my-6  rounded-lg">
                <h1 className="p-5 text-3xl font-semibold">
                    Feedback Analytics
                </h1>
                <FeedbackCharts />
            </div>
            {/* Support Ticket and Feedback Overview */}
            <div className="grid grid-cols-2 gap-4 ">
                <div className="p-4 border rounded-lg">
                    <h1 className="pb-3 text-lg font-semibold">Feedbacks</h1>
                    <FeedbackOverviewTable />
                    <div className="flex items-end justify-end">
                        <button className=" bg-[#99dd05] text-black text-xs p-3 m-2 rounded-md items-end ">
                            <Link to="/help/dashboard/feedbacks">
                                View All Feedbacks
                            </Link>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="p-4 border rounded-lg">
                        <h1 className="pb-3 text-lg font-semibold">
                            Support Tickets
                        </h1>
                        <SupportTicketOverviewTable />
                        <div className="flex items-end justify-end">
                            <button className=" bg-[#99dd05] text-black text-xs p-3 m-2 rounded-md items-end ">
                                <Link to="/help/dashboard/feedbacks">
                                    View All Tickets
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview
