import asyncHandler from 'express-async-handler';
import Order from '../models/DLOModel.js';

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
const addOrder = asyncHandler(async (req, res) => {
    const { orderID, customerName, customerAddress, shopName, shopAddress, orderStatus, deliveryDate, deliverId, deliverName } = req.body;

    const order = new Order({
        orderID,
        customerName,
        customerAddress,
        shopName,
        shopAddress,
        orderStatus,
        deliveryDate,
        deliverId,
        deliverName,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});



// @desc    Fetch all orders
// @route   GET /api/orders
// @access  Public
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Public
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        const allowedStatus = ['Pending', 'Ready', 'Picked Up', 'On The Way', 'Delivered'];
        const currentStatusIndex = allowedStatus.indexOf(order.orderStatus);

        // Ensure the status progresses in order and cannot be reversed
        if (currentStatusIndex < allowedStatus.length - 1) {
            order.orderStatus = allowedStatus[currentStatusIndex + 1];
        } else {
            return res.status(400).json({ message: 'Order is already delivered' });
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
});

export { getOrders, updateOrderStatus };

export { addOrder };
