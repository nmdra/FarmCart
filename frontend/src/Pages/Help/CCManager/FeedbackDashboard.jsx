import CCMDashboardNavBar from '../../../Components/Help/dashboard/CCMDashboardNavBar'
import FeedbackCharts from '../../../Components/Help/dashboard/FeedbackCharts'
import FeedbackDataViewTable from '../../../Components/Help/dashboard/FeedbackDataViewTable'

const FeedbackDashboard = () => {
    return (
        <div>
            <CCMDashboardNavBar />
            <div className="py-10 mx-auto max-w-7xl">
                <FeedbackCharts />
                <div className="py-[8rem] ">
                    <FeedbackDataViewTable />
                </div>
            </div>
        </div>
    )
}

export default FeedbackDashboard
