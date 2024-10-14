import { Search } from 'lucide-react'

const Hero = () => {
    return (
        <div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#b8f724] opacity-20 blur-[100px]"></div>
            </div>
            <div className="max-w-5xl mx-auto h-[60vh] ">
                <div className="flex flex-col justify-center md:py-[6rem] text-center gap-y-8">
                    <h1 className=" bg-[#f3ffc6] border border-[#b8f724] max-w-3xl mx-auto px-10 rounded-full py-1">
                        Best Food , Best Price & Guaranteed at your fingertips
                    </h1>
                    <h1 className="text-5xl ">
                        FRESH FRUIT , VEGETABLE & SPICES <br />
                        BOX DELIVERY AT PRICES YOU&apos;ll LOVE
                    </h1>
                    <div className="max-w-5xl px-10 py-3 mx-auto border-2 rounded-full  border-[#99DD05] flex items-center gap-3 hover:bg-[#f5fce6] hover:cursor-pointer">
                        <a href="/shops" className="flex items-center ">
                            <Search size={20} />
                            Explore the your marketplace
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
