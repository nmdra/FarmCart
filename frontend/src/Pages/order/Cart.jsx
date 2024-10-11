import { useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import CheckOutModal from './CheckOutModal'
// import { useGlobalRefetch } from '../Context/GlobalRefetch'
import axios from 'axios'
import toast from 'react-hot-toast'
import ProgressBar from '../../Components/Order/ProgressBar'

const Cart = () => {
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [coupon, setCoupon] = useState('')
    // const { setRefetch } = useGlobalRefetch()
    const [originalPrice, setOriginalPrice] = useState(0)
    // const { globalRefetch, setGlobalRefetch } = useGlobalReefetch()
    const [couponDiscount, setCouponDiscount] = useState(0)
    const [disabledCouponButton, setDisabledCouponButton] = useState(false)

    useEffect(() => {
        const getCart = async () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || []
            setCart(cart)
        }
        getCart()
    }, [])
    console.log(cart)

    const handleRemove = (productId) => {
        const updatedCart = cart.filter((product) => product._id !== productId)
        console.log(productId)
        setCart(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    useEffect(() => {
        const calculateOriginalPrice = () => {
            const originalPrice = cart.reduce((acc, item) => {
                return acc + item.price * item.quantity
            }, 0)
            console.log('originalPrice', originalPrice)
            setOriginalPrice(originalPrice)
        }

        calculateOriginalPrice()
    }, [cart])

    useEffect(() => {
        setTotal(originalPrice - couponDiscount)
    }, [originalPrice, couponDiscount])

    const addCoupon = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('/api/coupon/valid-coupon', {
                couponCode: coupon,
            })

            if (res.data.coupon) {
                const couponDiscount = res.data.coupon.discount
                const expiryDate = res.data.coupon.expiryDate

                if (new Date(expiryDate) < new Date()) {
                    toast.error('Coupon has expired')
                } else {
                    setCouponDiscount((total * couponDiscount) / 100)
                    localStorage.setItem(
                        'coupon',
                        JSON.stringify((total * couponDiscount) / 100)
                    )
                    toast.success('Coupon Applied Successfully')
                    setDisabledCouponButton(true)
                }
            }
        } catch (error) {
            toast.error('Invalid Coupon Code')
            setCouponDiscount(0)
        }
    }

    return (
        <div>
            <ProgressBar currentStep={1} />
            <section className="bg-white py-2 md:py-4 antialiased">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 border-gray-300 mb-2 ml-10 p-4 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
                        My Shopping Cart
                    </h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <table className="w-2/3 mr-4 table-auto border-collapse">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-4">Product</th>
                                    <th className="text-left py-4">Price</th>
                                    <th className="text-center py-4">
                                        Quantity
                                    </th>
                                    <th className="text-right py-4">
                                        Subtotal
                                    </th>
                                    <th className="text-right py-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((product) => (
                                    <tr
                                        key={product.productId}
                                        className="border-b"
                                    >
                                        <td className="py-4 flex items-center">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 rounded-lg object-cover mr-4"
                                            />
                                            <span>{product.name}</span>
                                        </td>
                                        <td className="py-4">
                                            Rs.{product.price.toFixed(2)}
                                        </td>
                                        <td className="py-4 text-center">
                                            <div className="flex items-center justify-center">
                                                <span className="mx-2">
                                                    {product.quantity}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right">
                                            Rs.
                                            {(
                                                product.price * product.quantity
                                            ).toFixed(2)}
                                        </td>
                                        <td className="py-4 text-right">
                                            <span
                                                className="text-red-500 cursor-pointer hover:text-red-600 font-semibold"
                                                onClick={() =>
                                                    handleRemove(product._id)
                                                }
                                            >
                                                Remove
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full border-b border-gray-300 pb-4 mb-4 ml-10 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                                <p className="text-xl font-semibold text-gray-900 ">
                                    Order summary
                                </p>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 ">
                                                Original price
                                            </dt>
                                            <dd className="text-base font-medium text-gray-900 ">
                                                LKR.{' '}
                                                {originalPrice.toLocaleString(
                                                    'en-US',
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </dd>
                                        </dl>

                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 ">
                                                Coupon Discount
                                            </dt>
                                            <dd className="text-base font-medium text-green-600">
                                                LKR.{' '}
                                                {couponDiscount.toLocaleString(
                                                    'en-US',
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    }
                                                )}
                                            </dd>
                                        </dl>
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                        <dt className="text-base font-bold text-gray-900 ">
                                            Total
                                        </dt>
                                        <dd className="text-base font-bold text-gray-900 ">
                                            LKR.{' '}
                                            {total > 0
                                                ? total.toLocaleString(
                                                      'en-US',
                                                      {
                                                          minimumFractionDigits: 2,
                                                          maximumFractionDigits: 2,
                                                      }
                                                  )
                                                : 0}
                                        </dd>
                                    </dl>
                                </div>

                                <Link to="/checkOut">
                                    <button
                                        disabled={cart.length === 0}
                                        className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium mt-4 text-white ${
                                            cart.length === 0
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300'
                                        }`}
                                    >
                                        Proceed to Checkout
                                    </button>
                                </Link>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-sm font-normal text-gray-500 ">
                                        {' '}
                                        or{' '}
                                    </span>
                                    <Link
                                        className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                                        to="/shops"
                                    >
                                        Continue Shopping
                                        <svg
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 12H5m14 0-4 4m4-4-4-4"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
                                <form className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="voucher"
                                            className="mb-2 block text-sm font-medium text-gray-900 "
                                        >
                                            {' '}
                                            Do you have a voucher or gift card?{' '}
                                        </label>
                                        <input
                                            type="text"
                                            id="voucher"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 "
                                            placeholder=""
                                            onChange={(e) =>
                                                setCoupon(e.target.value)
                                            }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={
                                            cart.length === 0 ||
                                            disabledCouponButton
                                        }
                                        className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium ${
                                            cart.length === 0 ||
                                            disabledCouponButton
                                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                                : 'bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300'
                                        }`}
                                        onClick={
                                            cart.length === 0 ? null : addCoupon
                                        }
                                    >
                                        Apply Code
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <CheckOutModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                cart={cart}
                setCart={setCart}
                // setGlobalRefetch={setGlobalRefetch}
                originalPrice={cart.price}
                // savings={savings}
                total={total}
            /> */}
        </div>
    )
}

export default Cart
