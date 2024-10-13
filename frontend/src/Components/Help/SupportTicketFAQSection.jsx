import { useState } from 'react'

const SupportTicketFAQSection = () => {
    const [openFAQ, setOpenFAQ] = useState(null)

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index)
    }

    const faqs = [
        {
            question: 'What is a support ticket?',
            answer: "A support ticket is a formal request for assistance regarding an issue or question related to Farmcart's services. It helps you communicate with the support team and track issue resolutions.",
        },
        {
            question: 'How do I create a support ticket?',
            answer: "Log in to your account, navigate to the 'Support' section, and fill out the ticket form. Provide all the necessary details to assist the support team in resolving your issue quickly.",
        },
        {
            question: 'What information should I include in my support ticket?',
            answer: 'Include a clear description of the issue, screenshots, order numbers (if applicable), and any relevant error messages.',
        },
        {
            question: 'How can I check the status of my support ticket?',
            answer: "You can track the status of your ticket in the 'Support' section under 'My Tickets'. You will also receive email updates when the support team responds.",
        },
        {
            question: 'How long does it take to get a response to my ticket?',
            answer: 'The support team typically responds within 24-48 hours. However, response times may vary depending on the complexity of the issue and ticket volume.',
        },
        {
            question:
                'Can I update or add more information to an existing ticket?',
            answer: "Yes, navigate to 'My Tickets', select the relevant ticket, and add comments or attachments to update it.",
        },
        {
            question: 'What happens if my issue is not resolved?',
            answer: 'If your issue is not resolved initially, the support team will continue working on it until a resolution is reached. You can request escalation if necessary.',
        },
        {
            question: 'Can I close a ticket once my issue is resolved?',
            answer: "Yes, you can close the ticket or the support team will mark it as 'Resolved' after the issue has been addressed. You can reopen it if needed.",
        },
        {
            question:
                'What should I do if I forgot to include important information in my ticket?',
            answer: "If you missed important details, you can edit the ticket by navigating to 'My Tickets' and adding the missing information.",
        },
        {
            question:
                'Is there a way to provide feedback on the support I received?',
            answer: 'Yes, after your ticket is resolved, you will have an option to provide feedback on the support you received.',
        },
    ]

    return (
        <section className="max-w-4xl p-5 mx-auto my-10 bg-white rounded-lg ">
            <h2 className="mb-8 text-3xl font-bold text-center">
                Support Ticket FAQs
            </h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b-2 border-gray-200">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="flex justify-between w-full py-4 text-left focus:outline-none"
                        >
                            <span className="text-lg font-semibold text-gray-700">
                                {faq.question}
                            </span>
                            <span>{openFAQ === index ? '-' : '+'}</span>
                        </button>
                        {openFAQ === index && (
                            <div className="py-2 text-gray-600">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default SupportTicketFAQSection
