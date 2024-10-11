import Farmer from '../../models/farmerModel'
import mongoose from 'mongoose'
export const getFarmersCount = async (req, res) => {
    try {
        const count = await Farmer.countDocuments()
        res.status(200).json({ count })
    } catch (error) {
        res.status(500).json({ error: 'Error fetching staff count' })
    }
}

export const getAllFarmers = async (req, res) => {
    try {
        const farmer = await Farmer.find({}) // Change sorting to firstName
        res.status(200).json(farmer)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
