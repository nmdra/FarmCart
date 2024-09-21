import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(
    'pk_test_51LMEvTC05RrpHY1zUINiBb70Oue9TVmbH9LoKTZKKa0Ra3a8J188Ph3kouCpSeLJUr7qCgndpWlAXwt5GVlZOLIY00SkMj6avh'
)
ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    // </React.StrictMode>
)
