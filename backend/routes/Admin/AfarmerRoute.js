import express from 'express'
import { getFarmersCount, getAllFarmers } from '../../controllers/Admin/Afarmer'

const router = express.Router()

router.get('/', getAllFarmers)
router.post('/count', getFarmersCount)

export default router
