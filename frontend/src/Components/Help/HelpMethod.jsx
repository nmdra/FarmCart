const helpMethod = [
    {
        title: 'Talk to the sales team',
        link: '/',
        linkTitle: 'Contact to our experts about your requirements',
    },
    {
        title: 'Sales inquiry',
        link: '/',
        linkTitle: 'Book a Call',
    },
    {
        title: 'Media and news',
        link: '/',
        linkTitle:
            'Looking for some information or want to ask us a question? Email our Press Team',
    },
    {
        title: 'Account recovery',
        link: '/',
        linkTitle: 'Email our Account Recovery team',
    },
    {
        title: 'Security, spam, phishing, and malware',
        link: '/',
        linkTitle: 'Report any security issues, spam, phishing or malware',
    },
    {
        title: 'Knowledge Base',
        link: '/',
        linkTitle: 'Find answers to our most frequently asked questions',
    },
    {
        title: 'FarmCart Academy',
        link: '/',
        linkTitle:
            'Enjoy over 500+ videos, explaining and exploring how to achieve success online',
    },
    {
        title: 'Tutorials',
        link: '/',
        linkTitle:
            'Learn how to do everything from building a website with AI to 20 ways to make money online',
    },
    {
        title: 'Customer success stories and our blog',
        link: '/',
        linkTitle:
            'Learn how our customers have found success and catch up on our latest articles',
    },
]
const HelpMethod = () => {
    return (
        <div className=" py-[8rem] ">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col items-center text-center gap-y-3">
                    <h1 className="text-3xl font-semibold ">
                        How can we help?
                    </h1>
                    <p>
                        If you&apos;re not already a Farmcart customer, or your
                        question relates to something different, here are some
                        alternative options.
                    </p>
                </div>
                <div className=" pt-[6rem]">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {helpMethod.map((item, index) => (
                            <div key={index}>
                                <div className="flex flex-col gap-y-2">
                                    <h1 className=" text-[#1e3201] text-xl font-semibold">
                                        {item.title}
                                    </h1>
                                    <a
                                        href={item.link}
                                        className=" font-semibold text-md hover:underline text-[#75b100]"
                                    >
                                        {item.linkTitle}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HelpMethod
