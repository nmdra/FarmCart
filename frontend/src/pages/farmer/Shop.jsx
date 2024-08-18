import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../axios';
import Sidebar from '../../Components/farmer/shopsidebar';
import shopCover from '../../assets/shop.png';

const Shop = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        localStorage.setItem('shopId', id);
        const { data } = await axios.get(`/shops/${id}`, config);
        setShop(data);
      } catch (error) {
        console.error('Error fetching shop details:', error);
      }
    };

    fetchShop();
  }, [id]);

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-screen bg-gray-100 p-6">
      <div className="p-6 pt-16 pl-8 rounded-lg shadow-md">
        <Sidebar />
      </div>

      <div className="flex-1 p-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4">
          <span className="text-gray-500">Shops</span> &gt; <span className="text-green-500">{shop.name}</span>
        </div>

        {/* Shop Name and Cover Image Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-2/3 ">
          <div className="relative">
            <img 
              src={shop.image || shopCover} 
              alt={shop.name} 
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
              {shop.name}
            </h2>
          </div>
        </div>

        {/* Shop Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex w-2/3">
          <div className="w-1/2 pr-4 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Details</h3>
            <p className="text-gray-600">{shop.name}</p>
            <p className="text-gray-600">{shop.address.houseNo}, {shop.address.streetName}, {shop.address.city}</p>
            <p className="text-gray-600">{shop.email}</p>
            <p className="text-gray-600">{shop.contactNumber}</p>
            <a href="#" className="text-green-500 mt-2 inline-block">Edit Details</a>
          </div>
          <div className="w-1/2 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
            <p className="text-gray-700">{shop.description}</p>
          </div>
        </div>

        {/* Order Stats Cards */}
        <div className="flex gap-x-10">
          <div className="bg-custom-green p-6 rounded-lg shadow-md w-1/5 text-center">
            <h3 className="text-2xl font-bold text-white">220</h3>
            <p className="text-white">Total Orders</p>
          </div>
          <div className="bg-custom-green p-6 rounded-lg shadow-md w-1/5 text-center">
            <h3 className="text-2xl font-bold text-white">20</h3>
            <p className="text-white">Ongoing Orders</p>
          </div>
          <div className="bg-custom-green p-6 rounded-lg shadow-md w-1/5 text-center">
            <h3 className="text-2xl font-bold text-white">200</h3>
            <p className="text-white">Completed Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
