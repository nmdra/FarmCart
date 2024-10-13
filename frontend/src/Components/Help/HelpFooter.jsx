import { Link } from 'react-router-dom'

const footerData = [
    {
        title: 'Company',
        links: [
            { name: 'About', path: '/about' },
            { name: 'Premium', path: '/premium' },
            { name: 'Blog', path: '/blog' },
            { name: 'Affiliate Program', path: '/affiliate' },
            { name: 'Get Coupon', path: '/coupon' },
        ],
    },
    {
        title: 'Order & Purchases',
        links: [
            { name: 'Order Status', path: '/order-status' },
            { name: 'Track Your Order', path: '/track-order' },
            { name: 'Purchase History', path: '/purchase-history' },
            { name: 'Returns & Refunds', path: '/returns' },
            { name: 'Payment Methods', path: '/payment-methods' },
        ],
    },
    {
        title: 'Support & Services',
        links: [
            { name: 'Contact Support', path: '/support' },
            { name: 'FAQs', path: '/faqs' },
            { name: 'Service Centers', path: '/service-centers' },
            { name: 'Warranty Information', path: '/warranty' },
            { name: 'Product Manuals', path: '/manuals' },
        ],
    },
    {
        title: 'Partnerships',
        links: [
            { name: 'Partner With Us', path: '/partner' },
            { name: 'Become a Supplier', path: '/supplier' },
            { name: 'Affiliate Program', path: '/affiliate' },
            { name: 'Collaboration Opportunities', path: '/collaboration' },
            { name: 'Sponsorship Requests', path: '/sponsorship' },
        ],
    },
    {
        title: 'Payment Options',
        links: [
            { name: 'Credit & Debit Cards', path: '/payment/cards' },
            { name: 'PayPal', path: '/payment/paypal' },
            { name: 'Bank Transfers', path: '/payment/bank-transfer' },
            { name: 'Installment Plans', path: '/payment/installments' },
            { name: 'Gift Cards', path: '/payment/gift-cards' },
        ],
    },
    {
        title: 'Rewards',
        links: [
            { name: 'Reward Points', path: '/rewards/points' },
            { name: 'Referral Program', path: '/rewards/referral' },
            { name: 'VIP Membership', path: '/rewards/vip' },
            { name: 'Exclusive Offers', path: '/rewards/offers' },
            { name: 'Redeem Rewards', path: '/rewards/redeem' },
        ],
    },
    {
        title: 'Trade Assurance',
        links: [
            { name: 'What is Trade Assurance?', path: '/trade-assurance' },
            { name: 'How It Works', path: '/trade-assurance/how-it-works' },
            {
                name: 'Buyer Protection',
                path: '/trade-assurance/buyer-protection',
            },
            {
                name: 'Seller Guarantee',
                path: '/trade-assurance/seller-guarantee',
            },
            { name: 'FAQs', path: '/trade-assurance/faqs' },
        ],
    },
    {
        title: 'Sell on Flowbite',
        links: [
            { name: 'Seller Registration', path: '/sell/register' },
            { name: 'Seller Dashboard', path: '/sell/dashboard' },
            { name: 'Shipping Options', path: '/sell/shipping' },
            { name: 'Fees and Pricing', path: '/sell/fees' },
            { name: 'Promoting Your Products', path: '/sell/promote' },
        ],
    },
    {
        title: 'Follow Us',
        links: [
            { name: 'Facebook', path: '/facebook' },
            { name: 'Twitter', path: '/twitter' },
            { name: 'LinkedIn', path: '/linkedin' },
            { name: 'Instagram', path: '/instagram' },
            { name: 'YouTube', path: '/youtube' },
        ],
    },
    {
        title: 'Social Media',
        links: [
            { name: 'TikTok', path: '/tiktok' },
            { name: 'Pinterest', path: '/pinterest' },
            { name: 'Snapchat', path: '/snapchat' },
            { name: 'Reddit', path: '/reddit' },
            { name: 'Tumblr', path: '/tumblr' },
        ],
    },
]

const HelpFooter = () => {
    return (
        <footer className="antialiased bg-white border-t dark:bg-gray-800">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                <div className="py-6 border-b border-gray-100 dark:border-gray-700 md:py-8 lg:py-16">
                    <div className="items-start gap-6 md:gap-8 lg:flex 2xl:gap-24">
                        <div className="grid flex-1 min-w-0 grid-cols-2 gap-6 md:gap-8 xl:grid-cols-5">
                            {footerData.map((section, index) => (
                                <div key={index}>
                                    <h6 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                                        {section.title}
                                    </h6>
                                    <ul className="space-y-3">
                                        {section.links.map((link, idx) => (
                                            <li key={idx}>
                                                <Link
                                                    to={link.path}
                                                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="py-6 text-center text-gray-500 dark:text-gray-400 md:py-8">
                    <span>
                        © 2024{' '}
                        <Link
                            to="#"
                            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                            Farmcart™
                        </Link>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default HelpFooter
