import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/logo.png'
import { FaCartShopping } from 'react-icons/fa6'

const BlogHeader = ({ loading }) => {
    return (
        <div>
            <div className="flex items-center justify-between py-6 mx-auto border-b max-w-7xl">
                <div>
                    <Link to="/blog">
                        <img src={logo} alt="Logo" width={160} height={160} />
                    </Link>
                </div>
                <div>
                    <Link to="/">
                        {' '}
                        {/* Update the link to the shop */}
                        <button
                            type="button"
                            className="flex items-center px-4 py-2 text-white rounded bg-lime-500 hover:bg-lime-600"
                            disabled={loading}
                        >
                            <FaCartShopping className="mr-2" />{' '}
                            {/* Cart icon placed here */}
                            {loading ? 'Adding...' : 'Shop with Farmcart'}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogHeader
