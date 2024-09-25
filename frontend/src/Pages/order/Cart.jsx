import { useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import CheckOutModal from './CheckOutModal'
// import { useGlobalRefetch } from '../Context/GlobalRefetch'
import axios from 'axios'
import toast from 'react-hot-toast'
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
        // setRefetch()
        // setGlobalRefetch(!globalRefetch);
    }
    // console.log('cart', cart)

    useEffect(() => {
        const calculateOriginalPrice = () => {
            const originalPrice = cart.reduce((acc, item) => {
                //remove kg from string and convert to number
                // item.kg = parseInt(item.kg.match(/\d+/)) || 0

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
            const res = await axios.post(
                '/api/coupon/valid-coupon',
                {
                    couponCode: coupon,
                }
            )

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
            <section className="bg-white py-8 antialiased  md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
                        Shopping Cart
                    </h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <div className="">
                            {cart.length > 0 ? (
                                cart.map((product) => (
                                    <div
                                        key={product.productId}
                                        className="mx-auto w-[800px] flex-none mt-5"
                                    >
                                        <div className="space-y-6">
                                            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm ">
                                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                    <div className="shrink-0 md:order-1">
                                                        <img
                                                            src={product.image}
                                                            alt=""
                                                            className="w-24 h-24 rounded-lg object-cover"
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                        <div className="text-end md:order-4 md:w-32">
                                                            <p className="text-base font-bold text-gray-900 ">
                                                                LKR.{' '}
                                                                {(
                                                                    product.price *
                                                                    product.quantity
                                                                ).toLocaleString(
                                                                    'en-US',
                                                                    {
                                                                        minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2,
                                                                    }
                                                                )}{' '}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                        <div className="text-base font-medium text-gray-900 hover:underline ">
                                                            Product Name :{' '}
                                                            {product.name}
                                                        </div>
                                                        <div className="text-base font-medium text-gray-900 hover:underline ">
                                                            Price : LKR.
                                                            {product.price}
                                                        </div>
                                                        <div className="text-base font-medium text-gray-900 hover:underline ">
                                                            Quantity :{' '}
                                                            {product.quantity}{' '}
                                                        </div>

                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        product._id
                                                                    )
                                                                }
                                                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                                            >
                                                                <svg
                                                                    className="me-1.5 h-5 w-5"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        stroke="currentColor"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M6 18 17.94 6M18 18 6.06 6"
                                                                    />
                                                                </svg>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="mx-auto w-[800px] flex-none mt-5">
                                    <p>Your cart is currently empty.</p>
                                </div>
                            )}
                        </div>

                        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
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
                                        className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white  ${
                                            cart.length === 0
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300'
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
                                                : 'bg-primary-700 text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                                        }`}
                                        onClick={
                                            cart.length === 0 ? '' : addCoupon
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
