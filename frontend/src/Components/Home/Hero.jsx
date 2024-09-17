import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,#b8f724_0,#faffe5_50%,rgba(0,163,255,0)_100%)]"></div>
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
            <Search size={20} />
            Explore the your marketplace
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
