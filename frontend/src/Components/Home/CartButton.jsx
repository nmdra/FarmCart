import React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'

const CartButton = ({ cartItemCount }) => {
    return (
        <Link to="/cart" className="relative flex items-center">
            <MdShoppingCart
                size={28}
                className="text-black hover:text-gray-700"
            />
            {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                </span>
            )}
        </Link>
    )
}

export default CartButton
