import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import farmcartLogo from '../../assets/logo.png'
import gold from '../../assets/premiumGold.png'
import silver from '../../assets/premiumSilver.png'
import PayhereBanner from '../../assets/PayhereShortBannerWhite.png'

const PaymentConfirmation = ({ setPaymentSuccess, setOrderID }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { billingCycle, membershipType } = location.state || {}
    const user = JSON.parse(localStorage.getItem('user'))
    const [paymentDetails, setPaymentDetails] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                const amount =
                    membershipType === 'gold'
                        ? billingCycle === 'monthly'
                            ? '790.00'
                            : '7990.00'
                        : billingCycle === 'monthly'
                          ? '490.00'
                          : '4990.00'

                const response = await axios.post('/api/users/genHash', {
                    amount,
                })

                const { orderId, hash } = response.data

                const payment = {
                    merchant_id: '1228062', // Replace with your Merchant ID
                    return_url: 'http://localhost:5173/complete', // Replace with your return URL
                    cancel_url: 'http://localhost:5173/cancel', // Replace with your cancel URL
                    notify_url: 'http://farmcart.com/notify', // Replace with your notify URL
                    order_id: orderId,
                    items: membershipType + ' Membership ' + billingCycle,
                    amount: amount,
                    currency: 'LKR',
                    hash: hash,
                    first_name: user.firstname,
                    last_name: user.lastname,
                    email: user.email,
                    phone: user.contactNumber,
                    address: user.defaultAddress.streetAddress,
                    city: user.defaultAddress.city,
                    country: 'Sri Lanka',
                    recurrence:
                        billingCycle === 'monthly' ? '1 Month' : '1 Year',
                    duration: billingCycle === 'monthly' ? '1 Year' : '1 Year',
                }

                setPaymentDetails(payment)
            } catch (error) {
                console.error('Error generating payment details', error)
            }
        }

        fetchPaymentDetails()
    }, [])

    useEffect(() => {
        if (success === true) {
            updateDB()
        }
    }, [success])

    const updateDB = async () => {
        try {
            const response = await axios.post('/api/users/upgrade', {
                membershipType: membershipType,
                billingCycle: billingCycle,
            })
            console.log(
                'Payment verified and recorded successfully',
                response.data
            )

            const json = response.data.user

            localStorage.setItem('user', JSON.stringify(json))
            navigate('/paymentComplete')
        } catch (error) {
            console.error('Error verifying payment', error)
        }
    }

    const pay = () => {
        if (paymentDetails) {
            window.payhere.startPayment(paymentDetails)
        }
    }

    window.payhere.onCompleted = function (order_id) {
        console.log('Payment completed. OrderID:', order_id)
        setSuccess(true)
    }

    window.payhere.onDismissed = function onDismissed() {
        console.log('Payment dismissed')
    }

    window.payhere.onError = function onError(error) {
        console.log('Error:' + error)
    }

    return (
        <div className="relative flex items-center justify-center py-10 bg-neutral-100 pr-6 pl-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border-2 my-6 border-green-500">
                <img
                    src={farmcartLogo}
                    alt="Logo"
                    className="h-5 w-auto mb-2"
                />
                <h1 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                    Payment Confirmation
                </h1>

                <div className="flex justify-center mb-6">
                    <div className="bg-transparent p-1 rounded-full">
                        <img
                            src={membershipType === 'gold' ? gold : silver}
                            alt="Plan Icon"
                            className="w-24 h-24 rounded-full"
                        />
                    </div>
                </div>
                <p className="text-lg text-gray-600 text-center">
                    You have selected the{' '}
                    <span className="font-bold">{membershipType}</span> plan
                    with a<span className="font-bold"> {billingCycle} </span>{' '}
                    billing cycle.
                </p>
                <p className="text-lg text-gray-700 font-semibold mt-4 text-center">
                    Amount: LKR {paymentDetails?.amount || '...'}
                </p>
                <button
                    onClick={pay}
                    className="mt-6 bg-green-600 text-white py-2 px-4 w-full  rounded-lg hover:bg-green-700 focus:outline-none"
                >
                    Proceed to Payment
                </button>

                <img
                    src={PayhereBanner}
                    alt="Payment Icon"
                    className="w-fit  rounded-md border-2 border-blue-500 mt-6 scale-75"
                />
            </div>
        </div>
    )
}

export default PaymentConfirmation
