import express from 'express'
import {
    ccmLogin,
    ccmLogout,
    ccmSignup,
    ccmVerifyEmail,
    ccmForgotPassword,
    ccmResetPassword,
    checkAuth,
} from '../../controllers/Help/authCCM.controller.js'
import { verifyToken } from '../../middlewares/help/VerifyToken.js'

const router = express.Router()

router.get('/check-auth', verifyToken, checkAuth)

router.post('/signup', ccmSignup)
router.post('/login', ccmLogin)
router.post('/logout', ccmLogout)
router.post('/verify-email', ccmVerifyEmail)
router.post('/forgot-password', ccmForgotPassword)
router.post('/reset-password/:token', ccmResetPassword)

export default router
