// routes/newsRoutes.js

import { Router } from 'express'

const router = Router()

// Mock data for demonstration (replace this with your database logic)
let newsItems = []

// GET endpoint for fetching news items
router.get('/', (req, res) => {
    res.json(newsItems) // Return the list of news items
})

// POST endpoint for adding news items
router.post('/', (req, res) => {
    const { title, description } = req.body
    const newItem = { id: newsItems.length + 1, title, description } // Assign an ID and add to the array
    newsItems.push(newItem)
    res.status(201).json(newItem) // Return the newly created news item
})

export default router
