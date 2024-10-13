import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'

const ProductPage = ({ onAddToCart }) => {
    const { id, productId } = useParams() // shop ID and product ID from URL
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()

    //const notify = () => toast("Item added to wishlist!");
    const notifyWishlist = () => toast.success('Item added to wishlist!')

    const handleAddClick = (product) => {
        const sanitizedProduct = {
            _id: productId,
            name: product.name,
            image: product.image,
            price: product.pricePerKg,
            quantity: quantity,
            discount: product.discount,
            shopId: id,
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || []
        // console.log('cart', product.productId)
        const existingProductIndex = cart.findIndex(
            (item) => item._id === productId
        )

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity =
                parseInt(cart[existingProductIndex].quantity) +
                parseInt(quantity)

            /// console.log('existingProductIndex', existingProductIndex)
        } else {
            cart.push(sanitizedProduct)
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        // setRefetch()
        /*navigate(`/cart`)*/

        toast.success('Item added to cart!')
    }

    useEffect(() => {
        // Fetch product details
        const fetchProductDetails = async () => {
            try {
                const productResponse = await axios.get(
                    `/api/userShops/${id}/products/${productId}`
                )
                setProduct(productResponse.data)
            } catch (error) {
                console.error('Failed to fetch product details', error)
            }
        }

        fetchProductDetails()
    }, [id, productId])
    const increaseCount = () => {
        setQuantity((prevCount) => prevCount + 1)
    }

    const decreaseCount = () => {
        setQuantity((prevCount) => (prevCount > 1 ? prevCount - 1 : 1))
    }

    return (
        <section className="text-gray-600 body-font overflow-hidden mb-0 mt-0">
            <div className="container px-2 py-8 mx-auto border-b border-gray-300 pb-4 mb-4 ml-10 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                        alt={product.name}
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-2xl"
                        style={{
                            width: '500px',
                            height: '400px',
                            objectFit: 'cover',
                        }}
                        src={
                            product.image
                                ? product.image.replace(/\.\w+$/, '.webp')
                                : 'https://placehold.co/400x400.webp'
                        }
                    />

                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            {product.brand}
                        </h2>
                        <h1 className="text-gray-900 text-4xl title-font font-medium mb-1">
                            {product.name || 'Product Name'}
                        </h1>
                        <p className="leading-relaxed mb-4">
                            {product.description ||
                                'Product description goes here.'}
                        </p>
                        <span className="title-font font-medium text-2xl text-gray-900 mt-6 ">
                            LKR{' '}
                            {(product.pricePerKg * quantity)?.toFixed(2) ||
                                '0.00'}
                        </span>
                        <p className="text-xs font-normal mb-2">
                            Tax included, shipping and discounts calculated at
                            checkout
                        </p>
                        <div className=" flex py-5">
                            <div className="flex  justify-center">
                                <button
                                    onClick={decreaseCount}
                                    className=" border text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors"
                                >
                                    <img
                                        width="15"
                                        height="15"
                                        src="https://img.icons8.com/?size=100&id=85458&format=png&color=000000"
                                        alt="minus"
                                    />
                                </button>
                                <span className="mx-4 text-lg font-semibold">
                                    {quantity}
                                </span>
                                <button
                                    onClick={increaseCount}
                                    className="border text-white px-4 py-2 rounded-lg  hover:bg-green-600 transition-colors"
                                >
                                    <img
                                        width="15"
                                        height="15"
                                        src="https://img.icons8.com/?size=100&id=3220&format=png&color=000000"
                                        alt="plus--v1"
                                    />
                                </button>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500">
                            You'll receive a pickup notification with all
                            details once your order is ready.
                        </p>
                        <div className="flex mt-6">
                            <button
                                onClick={
                                    () => handleAddClick(product)
                                    // onAddToCart(product)
                                }
                                className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 transition-colors rounded"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={notifyWishlist}
                                className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-pink-500 ml-4 hover:bg-pink-300 hover:text-pink-500 hover:shadow-lg transition duration-200 ease-in-out"
                            >
                                <svg
                                    fill="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h3 class="text-3xl font-bold mb-6 ml-7 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 relative">
                    Customer Reviews
                </h3>

                <div class="border-b border-gray-300 pb-4 mb-4 ml-10 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <p class="text-yellow-500 text-xl font-semibold mb-2">
                        ⭐⭐⭐⭐⭐
                    </p>
                    <p class="text-sm text-gray-700">
                        "This product is amazing! Very fresh and top quality."
                    </p>
                    <p class="text-xs text-gray-500 mt-2">
                        - Janith wijethunga
                    </p>
                </div>

                <div class="border-b border-gray-300 pb-4 mb-4 ml-10 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <p class="text-yellow-500 text-xl font-semibold mb-2">
                        ⭐⭐⭐⭐
                    </p>
                    <p class="text-sm text-gray-700">
                        "Good product but a bit pricey."
                    </p>
                    <p class="text-xs text-gray-500 mt-2">- Sashika prasad</p>
                </div>

                <div class="border-b border-gray-300 pb-4 mb-4 ml-10 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <p class="text-yellow-500 text-xl font-semibold mb-2">
                        ⭐⭐⭐⭐⭐
                    </p>
                    <p class="text-sm text-gray-700">
                        "Highly recommend! Will definitely buy again."
                    </p>
                    <p class="text-xs text-gray-500 mt-2">- Chathura milan</p>
                </div>
            </div>
        </section>
    )
}

export default ProductPage
