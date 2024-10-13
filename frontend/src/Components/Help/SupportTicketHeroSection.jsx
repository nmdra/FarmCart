import heroImg from '../../../public/heroimg.png'
const SupportTicketHeroSection = () => {
    return (
        <div>
            <section className="">
                <div className="absolute inset-0 -z-10 h-full w-full bg-[#faffe5] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#d0ff57] opacity-20 blur-[100px]"></div>
                </div>
                <div className="grid px-4 py-8 mx-auto max-w-7xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl ">
                            Not what you were looking for?
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            Browse through all of our Help Center articles
                            <br />
                            <br />
                            Get an answer to your question in minutes, day or
                            night, 365 days a year with our Customer Success
                            Team on live chat - which our experience has shown
                            to be much more effective and efficient than
                            telephone.
                        </p>
                        <a
                            href="#faq"
                            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-[#b8f724] hover:bg-[#1e3201] hover:text-white focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                        >
                            Get started
                            <svg
                                className="w-5 h-5 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 "
                        >
                            Go to Live Chat
                        </a>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src={heroImg} alt="mockup" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SupportTicketHeroSection
