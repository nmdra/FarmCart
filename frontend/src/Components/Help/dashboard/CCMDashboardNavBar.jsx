import { Link } from 'react-router-dom'

const NavLinks = [
    {
        title: 'Overview',
        to: '/help/dashboard',
    },
    {
        title: 'Support Tickets',
        to: '/help/dashboard/support-tickets',
    },
    {
        title: 'Feedbacks',
        to: '/help/dashboard/feedbacks',
    },
    {
        title: 'Live Chat',
        to: 'https://app.intercom.com/a/inbox/k00hovd0/inbox/admin/7838194/conversation/15?view=List',
        external: true, // To handle external links like Live Chat
    },
    {
        title: 'Knowledge Base',
        to: 'https://medium.com/@aweesha',
    },
]

const CCMDashboardNavBar = () => {
    return (
        <div className="p-4 text-white bg-gray-800">
            <nav className="mx-auto max-w-7xl">
                <ul className="flex space-x-10">
                    {NavLinks.map((link, index) => (
                        <li key={index}>
                            {link.external ? (
                                // External links like Live Chat
                                <a
                                    href={link.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition hover:text-yellow-300"
                                >
                                    {link.title}
                                </a>
                            ) : (
                                // Internal links using react-router-dom's Link
                                <Link
                                    to={link.to}
                                    className="transition hover:text-yellow-300"
                                >
                                    {link.title}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default CCMDashboardNavBar
