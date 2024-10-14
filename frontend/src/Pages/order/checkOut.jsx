import { Button, DatePicker, Input, Textarea } from '@nextui-org/react'
import {
    CardCvcElement,
    CardElement,
    CardExpiryElement,
    CardNumberElement,
} from '@stripe/react-stripe-js'
import { FaCcVisa } from 'react-icons/fa6'
import React, { useEffect, useState } from 'react'
import { FaCcMastercard } from 'react-icons/fa6'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getLocalTimeZone, today } from '@internationalized/date'

import ProgressBar from '../../Components/Order/ProgressBar'

const CheckOut = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [city, setCity] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [cart, setCart] = useState([])
    const [originalPrice, setOriginalPrice] = useState(0)
    const [total, setTotal] = useState(0)
    const [couponDiscount, setCouponDiscount] = useState(0)
    const [date, setDate] = useState('')
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        city: '',
        phone: '',
        address: '',
    })
    const [user, setUser] = useState({})

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {}
        setUser(user)
    }, [])

    useEffect(() => {
        const calculateOriginalPrice = () => {
            const originalPrice = cart.reduce((acc, item) => {
                return acc + item.price * item.quantity
            }, 0)
            setOriginalPrice(originalPrice)
        }

        calculateOriginalPrice()
    }, [cart])

    useEffect(() => {
        setTotal(originalPrice - couponDiscount)
    }, [originalPrice, couponDiscount])

    const onSubmit = async () => {
        const nameError = validateName(name)
        const emailError = validateEmail(email)
        const cityError = validateCity(city)
        const phoneError = validatePhone(phone)
        const addressError = validateAddress(address)

        setErrors({
            name: nameError,
            email: emailError,
            city: cityError,
            phone: phoneError,
            address: addressError,
        })

        if (
            nameError ||
            emailError ||
            cityError ||
            phoneError ||
            addressError
        ) {
            toast.error('Please correct the errors before proceeding.')
            return
        }

        if (!stripe || !elements) {
            toast.error('Stripe.js has not loaded yet.')
            return
        }

        const groupedOrders = cart.reduce((acc, item) => {
            if (!acc[item.shopId]) {
                acc[item.shopId] = []
            }
            acc[item.shopId].push(item)
            return acc
        }, {})

        try {
            for (const [shopId, orderItems] of Object.entries(groupedOrders)) {
                const data = {
                    farmer: { shopId },
                    user: user,
                    orderItems: orderItems,
                    shippingAddress: {
                        name,
                        email,
                        city,
                        phone,
                        address,
                    },
                    totalPrice: orderItems.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                    ),
                    deliveryDateObj: date,
                }

                const response = await axios.post(
                    '/api/orders/create-payment-intent',
                    {
                        totalPrice: (data.totalPrice / 300).toFixed(2),
                        user: data.user,
                    }
                )

                const clientSecret = response.data.clientSecret

                const paymentResult = await stripe.confirmCardPayment(
                    clientSecret,
                    {
                        payment_method: {
                            type: 'card',
                            card: elements.getElement(CardNumberElement),
                            billing_details: {
                                name: data.shippingAddress.name,
                                email: data.shippingAddress.email,
                            },
                        },
                    }
                )

                if (paymentResult.error) {
                    toast.error(paymentResult.error.message)
                    return
                } else if (paymentResult.paymentIntent.status === 'succeeded') {
                    await axios.post('/api/orders', data)
                    toast.success(`Payment successful and order placed!`)
                }
            }

            localStorage.removeItem('cart')
            localStorage.removeItem('coupon')
            navigate('/orderhistory')
        } catch (error) {
            toast.error('Failed to place order')
            console.error(error)
        }
    }

    useEffect(() => {
        const getCart = async () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || []
            if (cart.length > 0) {
                setCart(cart)
            } else {
                navigate('/')
            }
        }
        const getDiscount = async () => {
            const discount = JSON.parse(localStorage.getItem('coupon')) || 0
            setCouponDiscount(discount)
        }
        getCart()
        getDiscount()
    }, [])

    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s]*$/
        if (!name) {
            return 'Name is required.'
        } else if (!nameRegex.test(name)) {
            return 'Name can only contain letters and spaces.'
        }
        return ''
    }

    //Validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!email) {
            return 'Email is required.'
        } else if (!emailRegex.test(email)) {
            return 'Invalid email address.'
        } else if (email.length > 256) {
            return 'Email must be less than 256 characters.'
        }

        const invalidDomains = ['example.com', 'test.com']
        const emailDomain = email.split('@')[1]
        if (invalidDomains.includes(emailDomain)) {
            return 'This domain is not allowed.'
        }

        return ''
    }

    const validateCity = (city) => {
        const cityRegex = /^[a-zA-Z\s]*$/
        if (!city) {
            return 'City is required.'
        } else if (!cityRegex.test(city)) {
            return 'City can only contain letters and spaces.'
        }
        return ''
    }

    const validatePhone = (phone) => {
        const phoneRegex = /^0[0-9]{9}$/

        if (!phone) {
            return 'Phone number is required.'
        } else if (!phoneRegex.test(phone)) {
            return 'Phone number must contain 10 digits and start with 0'
        }

        return ''
    }

    const validateAddress = (address) => {
        if (!address) {
            return 'Address is required.'
        }
        return ''
    }

    const handleNameChange = (e) => {
        const { value } = e.target

        // Filter out invalid characters before setting the value
        const filteredValue = value.replace(/[^a-zA-Z\s]/g, '')
        setName(filteredValue)
        setErrors((prev) => ({ ...prev, name: validateName(filteredValue) }))
    }

    const handleEmailChange = (e) => {
        const { value } = e.target

        const domain = '@gmail.com'
        const domainIndex = value.indexOf(domain)

        const filteredValue =
            domainIndex !== -1
                ? value.slice(0, domainIndex + domain.length)
                : value

        setEmail(filteredValue)
        setErrors((prev) => ({ ...prev, email: validateEmail(filteredValue) }))
    }

    const handleCityChange = (e) => {
        const { value } = e.target

        const filteredValue = value.replace(/[^a-zA-Z\s]/g, '')
        setCity(filteredValue)
        setErrors((prev) => ({ ...prev, city: validateCity(filteredValue) }))
    }

    const handlePhoneChange = (e) => {
        const { value } = e.target

        if (/^[0-9]*$/.test(value) && value.length <= 10) {
            setPhone(value)
            setErrors((prev) => ({ ...prev, phone: validatePhone(value) }))
        } else {
            setErrors((prev) => ({ ...prev, phone: '' }))
        }
    }

    const handleAddressChange = (e) => {
        const { value } = e.target

        const specialCharRegex = /^[a-zA-Z0-9\s,.]*$/

        if (specialCharRegex.test(value) || value === '') {
            setAddress(value)
            setErrors((prev) => ({ ...prev, address: validateAddress(value) }))
        }
    }

    return (
        <div>
            <ProgressBar currentStep={2} />

            <div className="flex w-full justify-center ">
                <div className=" flex w-3/4 justify-center p-2 mt-3 items-center border rounded-lg ">
                    <div className="w-1/2 bg-white ">
                        <div className=" flex justify-center items-center p-10 ">
                            <div className=" w-[600px]">
                                <form className="flex flex-col gap-2">
                                    <div className="flex gap-3 ">
                                        <Input
                                            label="Your name"
                                            placeholder="Enter your name"
                                            type="text"
                                            variant="bordered"
                                            onChange={handleNameChange}
                                            value={name}
                                            isInvalid={!!errors.name}
                                            errorMessage={errors.name}
                                        />
                                        <Input
                                            value={email}
                                            type="email"
                                            label="Email"
                                            variant="bordered"
                                            onChange={handleEmailChange}
                                            isInvalid={!!errors.email}
                                            errorMessage={errors.email}
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <Input
                                            label="Your city"
                                            placeholder="Enter your city"
                                            type="text"
                                            variant="bordered"
                                            onChange={handleCityChange}
                                            value={city}
                                            isInvalid={!!errors.city}
                                            errorMessage={errors.city}
                                        />
                                        <Input
                                            className="hover:border-green-400 focus:border-green-400"
                                            label="Your phone number"
                                            placeholder="Enter your phone number"
                                            type="text"
                                            variant="bordered"
                                            onChange={handlePhoneChange}
                                            value={phone}
                                            isInvalid={!!errors.phone}
                                            errorMessage={errors.phone}
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <DatePicker
                                            label="Pick Delivery Date"
                                            variant="bordered"
                                            minValue={today(
                                                getLocalTimeZone()
                                            ).add({ days: 3 })}
                                            defaultValue={today(
                                                getLocalTimeZone()
                                            )}
                                            onChange={(date) => setDate(date)}
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <Textarea
                                            label="Your address"
                                            placeholder="Enter your address"
                                            type="text"
                                            variant="bordered"
                                            onChange={handleAddressChange}
                                            value={address}
                                            isInvalid={!!errors.address}
                                            errorMessage={errors.address}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-blue-500">
                                            Online Pay Credit/Debit Card
                                        </p>
                                        <div className="flex gap-2">
                                            <FaCcVisa className="text-2xl text-blue-500" />
                                            <FaCcMastercard className="text-2xl text-[#f1e427]" />
                                        </div>
                                    </div>
                                    <div className="gap-2 flex flex-col text-white  rounded-lg">
                                        <div className=" p-2 rounded-lg border-2 ">
                                            <CardNumberElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            iconColor:
                                                                '#c4f0ff',
                                                            color: 'black',
                                                            fontWeight: '400',
                                                            fontSize: '16px',

                                                            '::placeholder': {
                                                                color: '#d3d3d3',
                                                            },
                                                        },
                                                        invalid: {
                                                            iconColor:
                                                                '#FFC7EE',
                                                            color: 'red',
                                                        },
                                                        complete: {
                                                            color: 'green',
                                                            iconColor: 'green',
                                                            '::-webkit-input-placeholder':
                                                                {
                                                                    color: 'green',
                                                                },
                                                            '::placeholder': {
                                                                color: 'green',
                                                            },
                                                            ':-webkit-autofill':
                                                                {
                                                                    color: 'green',
                                                                    backgroundColor:
                                                                        'green',
                                                                },
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>
                                        <div className="flex w-full gap-2 ">
                                            <div className="flex-wrap w-full p-2 rounded-lg border-2">
                                                <CardExpiryElement
                                                    options={{
                                                        style: {
                                                            base: {
                                                                iconColor:
                                                                    '#c4f0ff',
                                                                color: 'black',
                                                                fontWeight:
                                                                    '400',

                                                                fontSize:
                                                                    '16px',

                                                                '::placeholder':
                                                                    {
                                                                        color: '#d3d3d3',
                                                                    },
                                                            },
                                                            invalid: {
                                                                iconColor:
                                                                    '#FFC7EE',
                                                                color: 'red',
                                                            },
                                                            complete: {
                                                                color: 'green',
                                                                iconColor:
                                                                    'green',
                                                                '::-webkit-input-placeholder':
                                                                    {
                                                                        color: 'green',
                                                                    },
                                                                '::placeholder':
                                                                    {
                                                                        color: 'green',
                                                                    },
                                                                ':-webkit-autofill':
                                                                    {
                                                                        color: 'green',
                                                                        backgroundColor:
                                                                            'green',
                                                                    },
                                                            },
                                                        },
                                                    }}
                                                />
                                            </div>
                                            <div className="flex-wrap w-full p-2 rounded-lg border-2 ">
                                                <CardCvcElement
                                                    options={{
                                                        style: {
                                                            base: {
                                                                iconColor:
                                                                    '#c4f0ff',
                                                                color: 'black',
                                                                fontWeight:
                                                                    '400',

                                                                fontSize:
                                                                    '16px',

                                                                '::placeholder':
                                                                    {
                                                                        color: '#d3d3d3',
                                                                    },
                                                            },
                                                            invalid: {
                                                                iconColor:
                                                                    '#FFC7EE',
                                                                color: 'red',
                                                            },
                                                            complete: {
                                                                color: 'green',
                                                                iconColor:
                                                                    'green',
                                                                '::-webkit-input-placeholder':
                                                                    {
                                                                        color: 'green',
                                                                    },
                                                                '::placeholder':
                                                                    {
                                                                        color: 'green',
                                                                    },
                                                                ':-webkit-autofill':
                                                                    {
                                                                        color: 'green',
                                                                        backgroundColor:
                                                                            'green',
                                                                    },
                                                            },
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        color="primary"
                                        onClick={onSubmit}
                                        className="hover:bg-green-600 bg-green-500"
                                    >
                                        PAY NOW
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col font-semibold text-2xl font-poppins border rounded-lg p-6 border-b border-gray-300 pb-4 mb-4 ml-10 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                        Order Summary
                        <div className="w-[400px] gap-2 ">
                            {cart.length > 0 ? (
                                cart.map((product) => (
                                    <div
                                        key={product.id}
                                        className="mx-auto flex-none mt-2"
                                    >
                                        <div className="rounded-lg p-2">
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={product.image}
                                                        alt=""
                                                        className="w-16 h-16 rounded-lg object-cover"
                                                    />
                                                    <div className="text-base font-medium text-gray-900">
                                                        {product.name} x
                                                        {product.quantity}
                                                    </div>
                                                </div>
                                                <div className="text-base font-bold text-gray-900 text-right">
                                                    LKR.{' '}
                                                    {(
                                                        product.price *
                                                        product.quantity
                                                    ).toLocaleString('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
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
                        {/* Price Summary */}
                        <div className="mt-4 w-[400px] flex flex-col">
                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-700">
                                    Subtotal:
                                </dt>
                                <dd className="text-base font-medium text-gray-900 text-right">
                                    LKR.{' '}
                                    {originalPrice.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </dd>
                            </dl>
                            <br></br>

                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-700">
                                    Coupon Discount:
                                </dt>
                                <dd className="text-base font-medium text-green-600 text-right">
                                    LKR.{' '}
                                    {couponDiscount.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </dd>
                            </dl>
                            <br></br>

                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                <dt className="text-base font-bold text-gray-900">
                                    Total:
                                </dt>
                                <dd className="text-base font-bold text-gray-900 text-right">
                                    LKR.{' '}
                                    {total > 0
                                        ? total.toLocaleString('en-US', {
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                          })
                                        : 0}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
