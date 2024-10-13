import FeedbackSubmitForm from './FeedbackSubmitForm'

function FeedbackHeroSection() {
    return (
        <div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#faffe5,transparent)]"></div>
            </div>
            <div className=" pt-10 pb-[10rem] mx-auto max-w-7xl">
                <div className="grid grid-cols-3 gap-4">
                    <div className="pt-10 ">
                        <h1 className="mb-4 text-3xl font-bold">
                            We Value Your Feedback!
                        </h1>
                        <p className="mb-6">
                            At Farmcart, we strive to provide the best possible
                            experience for our customers. Your feedback is
                            crucial in helping us understand what we are doing
                            well and where we can improve.
                        </p>
                        <p className="mb-4">
                            Whether you had a fantastic experience or
                            encountered some challenges, we want to hear from
                            you! Please take a moment to share your thoughts
                            about our services. Your insights will guide us in
                            enhancing our offerings.
                        </p>
                        <p>
                            Thank you for being a valued customer. We appreciate
                            your time and support!
                        </p>
                    </div>
                    <div className="col-span-2 ">
                        <FeedbackSubmitForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackHeroSection
