import { Link } from 'react-router-dom'

const CTABar = () => {
    return (
        <div className="bg-[#faffe5] py-3 mx-auto text-center flex items-center justify-center gap-10">
            <p className="text-xl">
                Connect with us today to earn extra income by selling your
                garden produce.
            </p>
            <Link to="/farmerlogin">
                <button className="px-4 py-2 text-xs border border-black hover:bg-[#b8f724] rounded-lg">
                    Click Here
                </button>
            </Link>
        </div>
    )
}

export default CTABar
