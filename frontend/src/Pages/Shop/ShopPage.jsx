import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ShopPage = () => {
  const { id } = useParams(); // shop ID from URL
  const [shop, setShop] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch shop details and products
    const fetchShopDetails = async () => {
      try {
        const response = await axios.get(`/api/userShops/${id}`);
        setShop(response.data);
      } catch (error) {
        console.error('Failed to fetch shop details', error);
      }
    };

    fetchShopDetails();
  }, [id]);

  // Search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term
  const filteredProducts = shop.products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
        <div className="relative min-h-screen bg-gray-50 grid grid-cols-1 justify-center px-32">
<div className="shop-page p-6">
  <div className="shop-details mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
    <img src={shop.image} alt={shop.name} className="w-full h-64 object-cover" />
    <div className="p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{shop.name}</h1>
      <p className="text-gray-700 text-lg mb-4">{shop.description}</p>
      <p className="text-gray-600 text-md mb-2">
        <span className="font-semibold">Address:</span> {shop.address?.houseNo} {shop.address?.streetName}, {shop.address?.city}, {shop.district}
      </p>
      <p className="text-gray-600 text-md mb-2">
        <span className="font-semibold">Contact:</span> {shop.contactNumber}
      </p>
      <p className="text-gray-600 text-md">
        <span className="font-semibold">Email:</span> {shop.email}
      </p>
    </div>
  </div>


  <div className="product-search mb-6 w-2/4">
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={handleSearch}
    className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
  />
</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map(product => (
          <div 
          key={product._id} 
          className="product-card border rounded-lg shadow-lg p-4 bg-white flex flex-col justify-between"
          /* Using flex and justify-between for vertical spacing */
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-40 object-cover rounded-lg mb-2"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-lg font-bold mt-2">Price: LKR {product.pricePerKg.toFixed(2)}</p>
          
          {/* Wrapping the button in a flex container with justify-center */}
          <div className="mt-auto flex justify-center">
            <Link 
              to={`/shops/${id}/product/${product._id}`} 
              className="w-35 block bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600 transition duration-200 text-center"
              /* Button is now centered within the card */
            >
              View Details
            </Link>
          </div>
        </div>
        
        
        ))}
      </div>
    </div>
    </div>
  );
};

export default ShopPage;
