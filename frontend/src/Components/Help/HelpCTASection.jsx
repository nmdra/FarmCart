import { BiSupport } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { MdOutlineFeedback } from 'react-icons/md'

const HelpCTASection = () => {
    return (
        <div className=" bg-[#faffe5] py-[6rem]">
            <div className="py-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Link
                        to="/help/support-ticket"
                        className=" p-10 border border-[#3c590e] bg-white rounded-md gap-x-6 hover:scale-105"
                    >
                        <div className="relative w-full h-full bg-white">
                            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_3%)]"></div>
                            <div className="flex items-center justify-center gap-6 ">
                                <BiSupport size={30} />

                                <div>
                                    <h1 className="text-3xl font-semibold text-[#1e3201]">
                                        Support Ticket
                                    </h1>
                                    <p className="text-sm font-medium  text-[#75b100]">
                                        We&apos;re ready and waiting 24/7 to
                                        answer your questions to solve your
                                        problems
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to="/help/feedback"
                        className=" p-10 border border-[#3c590e] bg-white rounded-md gap-x-6 hover:scale-105"
                    >
                        <div className="relative w-full h-full bg-white">
                            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_3%)]"></div>
                            <div className="flex items-center justify-center gap-6">
                                <MdOutlineFeedback size={30} />

                                <div>
                                    <h1 className="text-3xl font-semibold text-[#1e3201]">
                                        Leave Feedback
                                    </h1>
                                    <p className="text-sm font-medium  text-[#75b100]">
                                        Help us Make your Better Experience --
                                        We love being on our toes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HelpCTASection
