import { Link } from 'react-router-dom'

const CategoryBar = () => {
    return (
        <div className="py-5 mx-auto border-b max-w-7xl">
            <div className="flex items-center justify-center gap-10 text-sm text-center">
                <Link
                    to="/shops"
                    className="text-black hover:text-green-600 cursor-pointer hover:underline text-sm"
                >
                    Vegetables
                </Link>
                <Link
                    to="/shops"
                    className="text-black hover:text-green-600 cursor-pointer hover:underline text-sm"
                >
                    Fruits
                </Link>
                <Link
                    to="/shops"
                    className="text-black hover:text-green-600 cursor-pointer hover:underline text-sm"
                >
                    Spices
                </Link>
                <Link
                    to="/shops"
                    className="text-black hover:text-green-600 cursor-pointer hover:underline text-sm"
                >
                    Animal Products
                </Link>
            </div>
        </div>
    )
}

export default CategoryBar
