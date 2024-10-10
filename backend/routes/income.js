const express = require('express');
const Order = require('../models/Order'); 
const Refund = require('../models/Refund'); 

const router = express.Router();

// Helper function to check if a date is today

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};


router.get('/dashboard', async (req, res) => {
  const farmerId = '613b6cfd9c2e123456789abc'; 

  try {
    const today = new Date();

  
    const orders = await Order.find({ farmerId });

   
    const refunds = await Refund.find();

   
    const ordersToday = orders.filter(order => isToday(new Date(order.createdAt)));

    
    const totalIncomeToday = ordersToday.reduce((total, order) => total + order.amount, 0);

    
    const totalRefunds = refunds.length;

    
    const requestsToday = refunds.filter(refund => isToday(new Date(refund.createdAt))).length;

    
    const dashboardData = {
      orders,
      totalRefunds,
      totalIncomeToday,
      requestsToday,
      ordersTodayCount: ordersToday.length,
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
