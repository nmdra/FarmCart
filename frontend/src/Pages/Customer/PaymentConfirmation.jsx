import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import farmcartLogo from '../../assets/logo.png'
import gold from '../../assets/premiumGold.png'
import silver from '../../assets/premiumSilver.png'
import StripePayment from './StripePayment'

const PaymentConfirmation = ({ setPaymentSuccess, setOrderID }) => {
    const location = useLocation()
    const { billingCycle, membershipType } = location.state || {}
    const user = JSON.parse(localStorage.getItem('user'))
    const [amount, setAmount] = useState(null) // Store the payment amount

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            try {
                // Calculate the amount based on the membership and billing cycle
                const calculatedAmount =
                    membershipType === 'gold'
                        ? billingCycle === 'monthly'
                            ? '790.00'
                            : '7990.00'
                        : billingCycle === 'monthly'
                          ? '490.00'
                          : '4990.00'

                setAmount(calculatedAmount) // Set the amount for StripePayment

                // (Optional) Generate a payment hash or any additional details from your backend if needed.
            } catch (error) {
                console.error('Error generating payment details', error)
            }
        }

        fetchPaymentDetails()
    }, [billingCycle, membershipType])

    return (
        <div className="relative flex items-center justify-center py-10 bg-neutral-100 px-6">
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
                    with a <span className="font-bold">{billingCycle}</span>{' '}
                    billing cycle.
                </p>
                <p className="text-lg text-gray-700 font-semibold mt-4 text-center">
                    Amount: LKR {amount || '...'}
                </p>

                {/* Pass the calculated amount to StripePayment */}
                <StripePayment
                    amount={amount}
                    billingCycle={billingCycle}
                    membershipType={membershipType}
                />
            </div>
        </div>
    )
}

export default PaymentConfirmation
