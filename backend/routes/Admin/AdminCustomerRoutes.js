import express from 'express'
import {
    addCustomer,
    updateCustomer,
    getAllCustomers,
    getCustomerById,
    deleteCustomer,
} from '../../controllers/Admin/AdminCustomerController.js' // Correct path to Customer controller

const router = express.Router()

// Route to add a new customer
router.post('/addCustomer', addCustomer)

// Route to update an existing customer by ID
router.put('/:customerId', updateCustomer)

// Route to retrieve all customers
router.get('/', getAllCustomers)

// Route to retrieve a specific customer by ID
router.get('/:customerId', getCustomerById)

// Route to delete a customer by ID
router.delete('/:customerId', deleteCustomer)

export default router
