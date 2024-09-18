import { process } from "../../lib/constants/data";

const ProcessCTA = () => {
  return (
    <div className="py-[5rem] mx-auto max-w-7xl">
      <div className="grid items-center justify-center grid-cols-1 gap-6 md:grid-cols-5">
        {process.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center text-center gap-y-4 ">
            <h1 className=" text-[#04530D] text-4xl">{item.id}.</h1>
            <h1 className="text-xl font-semibold ">{item.title}</h1>
            <p className="text-sm text-neutral-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessCTA;
