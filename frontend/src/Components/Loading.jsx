import React from 'react'
import farmcartLogo from '../assets/logo.png'

function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center">
                <img
                    src={farmcartLogo}
                    alt="Site Logo"
                    className="mb-4 h-8 animate-pulse"
                />
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Loading
