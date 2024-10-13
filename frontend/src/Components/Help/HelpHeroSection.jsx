import { Link } from 'react-router-dom'

const HelpHeroSection = () => {
    return (
        <div className=" py-[5rem]">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#b8f724] opacity-20 blur-[100px]"></div>
            </div>
            <section className="">
                <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
                    <a
                        href="#"
                        className="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 border rounded-full mb-7"
                        role="alert"
                    >
                        <span className="text-xs bg-[#d0ff57] rounded-full text-black px-4 py-1.5 mr-3">
                            New
                        </span>{' '}
                        <span className="text-sm font-medium text-black">
                            Need Instant Help? 🚀 Our Live Chat is Coming Soon
                            to Assist You in Real-Time! 👋
                        </span>
                        <svg
                            className="w-5 h-5 ml-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
                        We&apos;re Here to Help! 💬
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                        Your Questions, Our Priority—Get Fast, Friendly Support
                        for All Your Farmcart Needs.
                    </p>
                    <div className="flex flex-col mb-8 space-y-4 lg:mb-16 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <Link
                            to="/help/support-ticket"
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-black hover:text-white rounded-lg bg-[#b8f724] hover:bg-[#588605] focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                        >
                            Learn more
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
                        </Link>
                        <Link
                            to="https://cal.com/aweesha-thavishanka/30min"
                            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-black border border-gray-300 rounded-lg dark:text-black hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                            <svg
                                className="w-5 h-5 mr-2 -ml-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                            </svg>
                            Talk with our Support Team
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HelpHeroSection
