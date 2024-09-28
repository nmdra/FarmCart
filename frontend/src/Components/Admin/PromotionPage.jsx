import { useState, useEffect } from 'react';
import axios from 'axios';

const OfferPage = () => {
  const [products, setProducts] = useState([]);
  const [promotionData, setPromotionData] = useState({ productId: '', discountPercentage: '' });

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/product'); // Update this with your correct API URL
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle promotion setup
  const handlePromotion = (productId) => {
    setPromotionData({ ...promotionData, productId });
  };

  // Submit the promotion to the backend
  const submitPromotion = async () => {
    try {
      await axios.post('/api/promotion', promotionData);
      alert('Promotion added successfully');
    } catch (error) {
      console.error('Error adding promotion', error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Current Price</th>
            <th>Add Promotion</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.currentPrice}</td>
              <td>
                <button onClick={() => handlePromotion(product._id)}>Add Promotion</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Promotion Form */}
      {promotionData.productId && (
        <div style={{ marginTop: '20px' }}>
          <h3>Add Promotion for Product ID: {promotionData.productId}</h3>
          <input
            type="number"
            placeholder="Enter discount percentage"
            value={promotionData.discountPercentage}
            onChange={(e) => setPromotionData({ ...promotionData, discountPercentage: e.target.value })}
          />
          <button onClick={submitPromotion}>Submit Promotion</button>
        </div>
      )}
    </div>
  );
};

export default OfferPage;
