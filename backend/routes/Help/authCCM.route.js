import express from 'express'
import {
    ccmLogin,
    ccmLogout,
    ccmSignup,
    ccmVerifyEmail,
} from '../../controllers/Help/authCCM.controller.js'

const router = express.Router()

router.post('/signup', ccmSignup)
router.post('/login', ccmLogin)
router.post('/logout', ccmLogout)
router.post('/verify-email', ccmVerifyEmail)

export default router
