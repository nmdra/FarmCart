import Customer from '../../models/Admin/AdminCustomer.js' // Correct path to Customer model

// Add a new customer
export const addCustomer = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body

        // Check if the email is already in use
        const existingCustomer = await Customer.findOne({ email })
        if (existingCustomer) {
            return res.status(400).json({ message: 'Email is already in use' })
        }

        // Create a new customer
        const customer = new Customer({
            name,
            email,
            phone,
            address,
        })

        // Save the customer to the database
        await customer.save()

        res.status(201).json(customer)
    } catch (error) {
        res.status(500).json({ message: 'Error adding customer', error })
    }
}

// Update an existing customer
export const updateCustomer = async (req, res) => {
    try {
        const { customerId } = req.params
        const { name, email, phone, address } = req.body

        // Find the customer by ID
        const customer = await Customer.findById(customerId)
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        // Check if email is already in use by another customer
        const existingCustomer = await Customer.findOne({
            email,
            _id: { $ne: customerId },
        })
        if (existingCustomer) {
            return res.status(400).json({ message: 'Email is already in use' })
        }

        // Update customer details
        customer.name = name
        customer.email = email
        customer.phone = phone
        customer.address = address

        await customer.save()

        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error })
    }
}

// Retrieve all customers
export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find()
        res.status(200).json(customers)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customers', error })
    }
}

// Retrieve a specific customer by ID
export const getCustomerById = async (req, res) => {
    try {
        const { customerId } = req.params

        const customer = await Customer.findById(customerId)
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customer', error })
    }
}

// Delete a customer
export const deleteCustomer = async (req, res) => {
    try {
        const { customerId } = req.params

        const customer = await Customer.findById(customerId)
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' })
        }

        await customer.deleteOne()

        res.status(200).json({ message: 'Customer deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error })
    }
}
