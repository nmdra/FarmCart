import { useState } from 'react'

// FAQ Data
const faqs = [
    {
        question: 'How can I contact customer support?',
        answer: 'You can reach our Customer Care team through: - Live Chat (Coming Soon!) - Email: support@farmcart.com - Phone: Customer Care Hotline: +1-800-123-4567 - Or simply fill out our Contact Us form, and we’ll get back to you as soon as possible.',
    },
    {
        question: 'What are the hours of operation for customer support?',
        answer: 'Our Customer Support team is available from 9 AM to 6 PM, Monday to Friday. However, you can leave us a message anytime, and we’ll respond during our business hours.',
    },
    {
        question:
            'How long does it take to get a response from customer support?',
        answer: 'We strive to respond to all inquiries within 24 hours. For urgent matters, please use the Live Chat feature (Coming Soon!) or contact us via phone during business hours.',
    },
    {
        question:
            'I have feedback about my shopping experience. How can I share it?',
        answer: 'We value your feedback! You can share your thoughts by using the Feedback Form on the Help & Support page, or you can email us directly at feedback@farmcart.com.',
    },
    {
        question: 'How can I check the status of my order or delivery?',
        answer: 'To check your order status, log in to your account and navigate to the Orders section. For further assistance, feel free to contact our customer care team.',
    },
    {
        question: 'What should I do if I receive damaged or incorrect items?',
        answer: 'If your order arrives damaged or incorrect, please reach out to our support team within 48 hours of receiving your delivery. We’ll assist you in resolving the issue promptly.',
    },
    {
        question: 'Can I cancel or modify my order after placing it?',
        answer: 'Orders can be modified or canceled within 2 hours of placing them. For assistance with changes, please contact our customer care team as soon as possible.',
    },
    {
        question:
            'What should I do if I have issues with my subscription or recurring orders?',
        answer: 'For issues related to your subscription or recurring orders, you can visit the Subscriptions section of your account. If you need further help, our Customer Care team is available to assist you.',
    },
    {
        question: 'How can I change or update my account information?',
        answer: 'You can update your account details, such as your email address, phone number, and delivery address, by logging into your account and navigating to the Account Settings page. If you encounter any issues, contact our support team for assistance.',
    },
    {
        question: 'Is there a way to provide feedback on customer support?',
        answer: 'Absolutely! After each support interaction, you’ll be prompted to leave feedback on your experience. We value your input as it helps us improve our services.',
    },
]

const HelpFAQs = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="max-w-3xl mx-auto py-[4rem]">
            {/* Title and Sub-paragraph */}
            <h2 className="text-5xl text-[#1e3201] font-bold text-center mb-4">
                Frequently Asked Questions
            </h2>
            <p className="text-center text-[#48690b] mb-6">
                Here are some common questions and answers that can help you
                navigate your experience with our services. If you need further
                assistance, don&apos;t hesitate to reach out to our support
                team!
            </p>

            <div className="bg-white border rounded-lg border-[#588605] my-10 ">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-[#48690b]/40 last:border-b-0"
                    >
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100"
                            onClick={() => toggleAccordion(index)}
                        >
                            <h4 className="text-lg font-semibold">
                                {faq.question}
                            </h4>
                            <span className="text-xl">
                                {openIndex === index ? '-' : '+'}
                            </span>
                        </div>
                        {openIndex === index && (
                            <div className="p-4 text-gray-700">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HelpFAQs
