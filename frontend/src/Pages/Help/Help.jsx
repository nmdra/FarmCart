import HelpCTASection from '../../Components/Help/HelpCTASection'
import HelpFAQs from '../../Components/Help/HelpFAQs'
import HelpHeroSection from '../../Components/Help/HelpHeroSection'
import HelpMethod from '../../Components/Help/HelpMethod'

const Help = () => {
    return (
        <div>
            <HelpHeroSection />
            <HelpCTASection />
            <HelpMethod />
            <HelpFAQs />
        </div>
    )
}

export default Help
