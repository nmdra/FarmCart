import express from 'express'
import { authUser, logoutUser, registerUser, verifyEmail } from '../controllers/userController.js'

const router = express.Router()

router.route('').post(registerUser)
router.route('/auth').post(authUser)
router.route('/logout').post(logoutUser)
router.route('/verify').get(verifyEmail)
export default router
