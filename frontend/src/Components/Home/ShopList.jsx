import { shopList } from '../../lib/constants/data'
import { useNavigate } from 'react-router-dom'

const ShopList = () => {
    const navigate = useNavigate()
    return (
        <div className="mx-auto max-w-7xl py-[5rem]">
            <h1 className="pb-10 text-4xl">Shop List</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                {shopList.map((item, index) => (
                    <div
                        key={index}
                        className=" border-2 p-2 border-[#b8f724] rounded-lg"
                    >
                        <div>
                            <img
                                src={item.cover_img}
                                alt={item.shop_name}
                                className="object-cover w-[300px] h-[200px] rounded-md"
                            />
                        </div>
                        <div className="flex flex-col py-3 gap-y-2">
                            <div className="">
                                <h1 className="text-xl ">{item.shop_name}</h1>
                            </div>
                            <div className="flex items-center gap-3 ">
                                <h1>{item.ratings}</h1>

                                <h1>LKR.{item.delivery_fee}</h1>
                                <h1>{item.location}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center pt-10 pb-[6rem] ">
                <button
                    className="px-10 py-4 bg-[#b8f724] rounded-lg hover:bg-[#f3ffc6]"
                    onClick={() => navigate('/shops')}
                >
                    View More
                </button>
            </div>
            <div className=" h-[0.6vh] bg-[#f3ffc6] max-w-3xl mx-auto"></div>
        </div>
    )
}

export default ShopList
