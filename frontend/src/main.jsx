import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Elements stripe={stripePromise}>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </Elements>
    // </React.StrictMode>
)
