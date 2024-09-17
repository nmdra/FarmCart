const CategoryBar = () => {
  return (
    <div className="py-5 mx-auto border-b max-w-7xl">
      <div className="flex items-center justify-center gap-10 text-sm text-center ">
        <span className=" text-black hover:text-[#99DD05] cursor-pointer hover:underline text-sm">
          Vegetables
        </span>
        <span className=" text-black hover:text-[#99DD05] cursor-pointer hover:underline text-sm">
          Fruits
        </span>
        <span className=" text-black hover:text-[#99DD05] cursor-pointer hover:underline text-sm">
          Spices
        </span>
        <span className=" text-black hover:text-[#99DD05] cursor-pointer hover:underline text-sm">
          Animal Products
        </span>
      </div>
    </div>
  );
};

export default CategoryBar;
