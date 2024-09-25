import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { HiOutlineCheckBadge, HiArrowRight } from 'react-icons/hi2'
import Breadcrumbs from '../../Components/Breadcrumbs'

const MembershipUpgrade = () => {
    const [billingCycle, setBillingCycle] = useState('monthly')
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        document.title = 'FarmCart : Membership'
    }, [])

    const redirectToConfirmation = (membershipType) => {
        navigate('/payment-confirmation', {
            state: { billingCycle, membershipType },
        })
    }

    const upgradeToSilver = () => {
        redirectToConfirmation('silver')
    }

    const upgradeToGold = () => {
        redirectToConfirmation('gold')
    }

    const toggleBillingCycle = (cycle) => {
        setBillingCycle(cycle)
    }

    // Determine if the user is already subscribed
    const isSubscribed =
        user.membershipType === 'silver' || user.membershipType === 'gold'

    return (
        <section className="text-gray-600 body-font overflow-hidden bg-gray-100 px-4">
            <Breadcrumbs /> {/* Breadcrumbs at the top */}
            {/* Conditionally Render Membership Banner */}
            <div className="flex w-fit items-center max-md:flex-col gap-6 animated-background bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3.5  mx-6 rounded font-[sans-serif] mt-4 shadow-sm">
                <p className="text-base flex-1 max-md:text-center">
                    {isSubscribed
                        ? `You are already subscribed to the ${user.membershipType.charAt(0).toUpperCase() + user.membershipType.slice(1)} plan! Enjoy your exclusive benefits including discounts and free delivery.`
                        : "Don't miss out on our amazing MEMBERSHIP PLANS! Upgrade to Silver or Gold and enjoy exclusive benefits including discounts and free delivery."}
                </p>
                <div className="flex items-center">
                    <Link to="/membership">
                        <button
                            type="button"
                            className="bg-slate-100 hover:bg-slate-200 hover:scale-110 transition-transform text-green-900 py-2.5 px-5 rounded text-md shadow-sm"
                        >
                            View Promotions
                        </button>
                    </Link>
                </div>
            </div>
            <div className="container px-5 py-4 pb-8 mx-auto ">
                <div className="flex flex-col text-center w-full mb-10">
                    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                        Upgrade Your Membership
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">
                        Choose a plan that best suits your needs and enjoy
                        exclusive benefits.
                    </p>
                    <div className="flex mx-auto border-2 border-lime-700 rounded overflow-hidden mt-6">
                        <button
                            className={`py-1 px-4 ${billingCycle === 'monthly' ? 'bg-green-600 text-white' : 'text-green-950'} focus:outline-none`}
                            onClick={() => toggleBillingCycle('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            className={`py-1 px-4 ${billingCycle === 'annually' ? 'bg-green-600 text-white' : 'text-green-950'} focus:outline-none`}
                            onClick={() => toggleBillingCycle('annually')}
                        >
                            Annually
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center -m-4">
                    {/* Silver Plan */}
                    <div
                        className={`p-4 xl:w-2/6 md:w-1/2 w-full ${isSubscribed ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden bg-white">
                            <h2 className="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">
                                SILVER
                            </h2>
                            <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                                {billingCycle === 'monthly'
                                    ? 'Rs. 490/mo'
                                    : 'Rs. 4990/yr'}
                            </h1>
                            <p className="flex items-center text-gray-600 mb-2">
                                <HiOutlineCheckBadge className="size-5 text-gray-700" />
                                10% Discount on all items
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <HiOutlineCheckBadge className="size-5 text-gray-700" />
                                Free standard delivery
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <HiOutlineCheckBadge className="size-5 text-gray-700" />
                                Priority customer support
                            </p>
                            <p className="flex items-center text-gray-600 mb-6">
                                <HiOutlineCheckBadge className="size-5 text-gray-700" />
                                Access to members-only events
                            </p>
                            <button
                                onClick={upgradeToSilver}
                                className="flex items-center mt-auto text-white bg-gray-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-700 rounded"
                            >
                                Upgrade to Silver
                                <HiArrowRight className="w-4 h-4 ml-auto" />
                            </button>
                            <p className="text-xs text-gray-500 mt-3">
                                Upgrade now and enjoy additional benefits.
                            </p>
                        </div>
                    </div>

                    {/* Gold Plan (Highlighted) */}
                    <div
                        className={`p-4 xl:w-2/6 md:w-1/2 w-full ${isSubscribed ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <div className="h-full p-6 rounded-lg border-2 border-amber-500 flex flex-col relative overflow-hidden bg-white shadow hover:shadow-lg hover:shadow-amber-500/50">
                            <span className="bg-amber-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
                                POPULAR
                            </span>
                            <h2 className="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium">
                                GOLD
                            </h2>
                            <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                                {billingCycle === 'monthly'
                                    ? 'Rs. 790/mo'
                                    : 'Rs. 7990/yr'}
                            </h1>
                            <p className="flex items-center text-gray-600 mb-2">
                                <HiOutlineCheckBadge className="size-5 text-gray-700" />
                                20% Discount on all items
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <HiOutlineCheckBadge className="size-5 text-gray-700" />
                                Free express delivery
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <HiOutlineCheckBadge className="size-5 text-gray-700" />
                                Dedicated account manager
                            </p>
                            <p className="flex items-center text-gray-600 mb-2">
                                <HiOutlineCheckBadge className="size-5 text-gray-700" />
                                Exclusive early access to sales
                            </p>
                            <p className="flex items-center text-gray-600 mb-6">
                                <HiOutlineCheckBadge className="size-5 text-gray-700" />
                                Priority invitations to events
                            </p>
                            <button
                                onClick={upgradeToGold}
                                className="flex items-center mt-auto text-white bg-amber-600 border-0 py-2 px-4 w-full focus:outline-none hover:bg-amber-700 rounded"
                            >
                                Upgrade to Gold
                                <HiArrowRight className="w-4 h-4 ml-auto" />
                            </button>
                            <p className="text-xs text-gray-500 mt-3">
                                Get the most out of your membership with Gold.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MembershipUpgrade
