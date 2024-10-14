import FeedbackCharts from '../../../Components/Help/dashboard/FeedbackCharts'
import FeedbackDataViewTable from '../../../Components/Help/dashboard/FeedbackDataViewTable'

const FeedbackDashboard = () => {
    return (
        <div className="mx-auto max-w-7xl">
            <FeedbackCharts />
            <div className="py-[8rem] ">
                <FeedbackDataViewTable />
            </div>
        </div>
    )
}

export default FeedbackDashboard
