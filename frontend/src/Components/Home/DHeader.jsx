import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Logo.png'

const Header = () => {
    return (
        <div>
            <div className="flex items-center justify-between py-6 mx-auto border-b max-w-7xl">
                <div>
                    <Link to="/">
                        <img src={logo} alt="Logo" width={160} height={160} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header
