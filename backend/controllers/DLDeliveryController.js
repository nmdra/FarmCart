import DLDriver from '../models/DLDriverModel.js';
import Order from '../models/DLOModel.js';
import DLDelivery from '../models/DLDeliveryModel.js';



// Function to generate a tracking ID starting with 'TR' followed by 5 digits
const generateTrackingID = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `TR${randomNum}`;
};

// Controller to assign a driver and create delivery record
export const assignDriverToOrder = async () => {
    try {
        // Find the oldest order
        const order = await Order.findOne().sort({ createdAt: 1 });
        if (!order) {
            /* console.log('No orders available');*/
            return;
        }

        // Find an available driver
        const driver = await DLDriver.findOne({ isAvailable: true }).sort({ createdAt: 1 });
        if (!driver) {
           /* console.log('No drivers available');*/
            return;
        }

        // Generate tracking ID
        const trackingID = generateTrackingID();

        // Create a new delivery entry
        const delivery = new DLDelivery({
            trackingID,
            orderID: order._id,
            driverID: driver._id,
            drID: driver.driverID,
            shopName: order.shopName,
            pickupAddress: {
                streetAddress: order.shopAddress.streetName, // Make sure to pass this field
                city: order.shopAddress.city,
                district: order.shopAddress.district, // Make sure this is provided
            },
            customerName: order.customerName,
            dropOffAddress: {
                streetAddress: order.customerAddress.streetAddress,
                city: order.customerAddress.city,
                zipCode: order.customerAddress.zipCode,
                district: order.customerAddress.district,
            },
        });

        await delivery.save();

        // Update the driver's status to unavailable
        driver.isAvailable = false;
        await driver.save();

        // Delete the order after assignment
        await Order.deleteOne({ _id: order._id });

        /* console.log(`Assigned driver ${driver.fullName} to order ${order._id} with tracking ID ${trackingID}`); */
    } catch (error) {
        console.error('Error assigning driver to order:', error);
    }
};

// Function to constantly check for available drivers and assign them to oldest orders
export const checkForAvailableDrivers = async () => {
    try {
        // Continuously check every few seconds
        setInterval(async () => {
            await assignDriverToOrder();
        }, 5000); // Check every 5 seconds
    } catch (error) {
        console.error('Error in checking for available drivers:', error);
    }
};
