import { testimonials } from '../../lib/constants/data'

const Testimonials = () => {
    return (
        <div className=" py-[5rem] max-w-7xl mx-auto">
            <div className="flex flex-col justify-center text-center gap-y-6">
                <div>
                    <h1 className="text-xl uppercase ">Testimonials</h1>
                    <h1 className="text-4xl ">Loved by your friends</h1>
                </div>
                <div>
                    <button className="px-6 py-2 border border-black rounded-lg hover:bg-[#b8f724]">
                        All Testimonials
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-6 pt-10 md:grid-cols-3">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className=" border border-[#b8f724] bg-[#f3ffc6] p-7 rounded-md flex flex-col gap-y-4"
                        >
                            <h3 className="text-xl font-semibold ">
                                &quot; {item.text} &quot;
                            </h3>
                            <div>
                                <p className="text-xs">{item.name}</p>
                                <p>{item.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Testimonials
