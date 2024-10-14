import express from 'express'
import {
    authUser,
    deleteUserAccount,
    forgotPassword,
    getUserById,
    logoutUser,
    paymentUser,
    registerUser,
    resetPassword,
    sendVerifyEmail,
    updatePassword,
    updateUser,
    upgradeMembership,
    validatePassword,
    verifyEmail,
} from '../controllers/userController.js'
import protect from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('').post(registerUser).put(protect, updateUser)
router.route('/auth').post(authUser)
router.route('/logout').post(protect, logoutUser)
router.route('/verify').get(verifyEmail)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-pass').post(resetPassword)
router.route('/resendEmail').post(sendVerifyEmail)
router.route('/upgrade').post(protect, upgradeMembership)
router.route('/paymentIntent').post(protect, paymentUser)
router.route('/validate-password').post(protect, validatePassword) // Route to validate the current password
router.route('/update-password').put(protect, updatePassword) // Route to update the password
router.route('/').delete(protect, deleteUserAccount)

router.route('/:id').get(protect, getUserById)

export default router
