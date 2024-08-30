import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiChevronRight, HiHome } from 'react-icons/hi2'

const Breadcrumbs = () => {
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x)

    return (
        <nav
            className="flex mb-4 text-sm text-gray-700 pt-3"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link to="/" className="text-gray-700 hover:text-gray-900">
                        <HiHome className="size-6 text-green-500 " />
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`

                    return (
                        <li key={to} className="inline-flex items-center">
                            <span className="mx-2">
                                <HiChevronRight className="size-5" />
                            </span>
                            {index === pathnames.length - 1 ? (
                                <span className="text-gray-500">{value}</span>
                            ) : (
                                <Link
                                    to={to}
                                    className="text-gray-700 hover:text-gray-900"
                                >
                                    {value.charAt(0).toUpperCase() +
                                        value.slice(1)}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}

export default Breadcrumbs
