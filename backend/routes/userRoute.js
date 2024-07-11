import express from 'express'
import { authUser, logoutUser, registerUser } from '../controllers/userController.js'

const router = express.Router()

router.route('').post(registerUser)
router.route('/auth').post(authUser)
router.route('/logout').post(logoutUser)
export default router
