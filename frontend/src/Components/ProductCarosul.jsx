import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Add navigation hook
import Loading from './Loading'

const ProductCarousel = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate() // Initialize navigation

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/userShops/random')
                setProducts(data)
                console.log(data)
            } catch (error) {
                console.error('Failed to fetch products', error)
                // Set error message to state if required
                setError('Failed to load products. Please try again later.')
            }
        }

        fetchProducts()
    }, []) // This will only run once

    const handleProductClick = (shopId, productId) => {
        // Navigate to product details page
        navigate(`/shops/${shopId}/product/${productId}`)
    }

    // Settings for the carousel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }

    return (
        <div className="max-w-6xl mx-2 px-6 py-8  bg-white rounded-lg shadow-lg border-2 border-green-400 mt-8">
            <h2 className="text-lg font-semibold mb-5 text-gray-900">
                You may also like
            </h2>
            {products.length > 0 ? (
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <div key={index} className="p-4">
                            <div
                                className="bg-white rounded-lg shadow-lg p-4 cursor-pointer border-2 hover:border-2 hover:border-green-400 hover:bg-slate-100"
                                onClick={() =>
                                    handleProductClick(
                                        product._id,
                                        product.products._id
                                    )
                                } // Navigate on click
                            >
                                <img
                                    src={
                                        product.products.image
                                            ? product.products.image.replace(
                                                  /\.\w+$/,
                                                  '.webp'
                                              )
                                            : 'https://placehold.co/400x400.webp'
                                    }
                                    alt={product.products.name}
                                    className="h-40 w-full object-cover mb-4"
                                />
                                <h3 className="text-lg font-bold">
                                    {product.products.name}
                                </h3>
                                <p className="text-gray-500">
                                    Rs.{product.products.pricePerKg}
                                </p>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <Loading />
            )}
        </div>
    )
}

export default ProductCarousel
