import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: 'black',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': { color: '#fce883' },
            '::placeholder': { color: '#87bbfd' },
        },
        invalid: {
            iconColor: '#ffc7ee',
            color: '#ffc7ee',
        },
    },
}

const StripePayment = ({ amount, billingCycle, membershipType }) => {
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false) // New loading state
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const updateDB = async () => {
        try {
            const response = await axios.post('/api/users/upgrade', {
                membershipType,
                billingCycle,
            })
            const updatedUser = response.data.user
            localStorage.setItem('user', JSON.stringify(updatedUser))
        } catch (error) {
            console.error('Error verifying payment', error)
            toast.error('Failed to verify payment')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true) // Start loading

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })

        if (!error) {
            try {
                const { id } = paymentMethod
                const email = JSON.parse(localStorage.getItem('user')).email
                console.log(id, email)

                // Send the amount and payment method ID to the server to create a payment intent
                const response = await axios.post('/api/users/paymentIntent', {
                    amount: amount * 100, // Stripe expects amount in cents
                    id,
                    email,
                })

                if (response.data.success) {
                    setSuccess(true)
                    updateDB()
                    setLoading(false) // Stop loading after the process is done
                    toast.success('Payment successful!')
                    navigate('/paymentComplete')
                }
            } catch (error) {
                console.error('Payment error:', error)
                setLoading(false) // Stop loading after the process is done
                toast.error('Failed to process payment')
            }
        } else {
            console.error('Stripe error:', error.message)
            setLoading(false) // Stop loading after the process is done
            toast.error(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center mt-3 bg-gray-100">
            {!success ? (
                <form
                    className="w-[720px] p-6 bg-white shadow-md rounded-md"
                    onSubmit={handleSubmit}
                >
                    <fieldset className="FormGroup space-y-4">
                        <div className="FormRow">
                            <CardElement
                                options={CARD_OPTIONS}
                                className="p-2 border rounded-md"
                            />
                        </div>
                    </fieldset>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex justify-center items-center"
                        type="submit"
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                                />
                            </svg>
                        ) : (
                            `Pay ${amount ? `LKR ${amount}` : ''}`
                        )}
                    </button>
                </form>
            ) : (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">
                        You just bought this!
                    </h2>
                </div>
            )}
        </div>
    )
}

export default StripePayment
