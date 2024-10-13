import SupportTicketFAQSection from '../../Components/Help/SupportTicketFAQSection'
import SupportTicketForm from '../../Components/Help/SupportTicketForm'
import SupportTicketHeroSection from '../../Components/Help/SupportTicketHeroSection'

const SupportTicket = () => {
    return (
        <div>
            <SupportTicketHeroSection />
            <section id="faq" className="">
                <SupportTicketForm />
            </section>
            <div className="py-10 ">
                <SupportTicketFAQSection />
            </div>
        </div>
    )
}

export default SupportTicket
