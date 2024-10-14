import CCMDashboardNavBar from '../../../Components/Help/dashboard/CCMDashboardNavBar'
import Overview from '../../../Components/Help/dashboard/Overview'

const Dashboard = () => {
    return (
        <div>
            <CCMDashboardNavBar />
            <div className="py-10 mx-auto max-w-7xl">
                <div>
                    <Overview />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
