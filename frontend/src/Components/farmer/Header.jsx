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

                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/register-driver"
                            className="text-black hover:text-[#99DD05] cursor-pointer hover:underline text-sm"
                        >
                            Become a Driver
                        </Link>
                        <Link
                            to="/help"
                            className="text-black hover:text-[#99DD05] cursor-pointer hover:underline text-sm"
                        >
                            Help & Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
