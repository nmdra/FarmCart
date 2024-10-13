// Example content of farmerauthMiddleware.js
import jwt from 'jsonwebtoken'
import Farmer from '../models/farmerModel.js'

export const protect = async (req, res, next) => {
    let token
    console.log('Authenticating')
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            try {
                // Extract token from header
                token = req.headers.authorization.split(' ')[1]
                // Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                // Get farmer from the token
                req.user = await Farmer.findById(decoded.userId).select(
                    '-password'
                )
                next()
            } catch (err) {
                res.status(401).json({
                    message: 'Not authorized, token failed',
                })
                console.error('Token verification failed:', err)
                throw new Error('Not authorized, token failed')
            }
        } else {
            res.status(401).json({ message: 'Not authorized, no token' })
            throw new Error('Not authorized, no token')
        }
    } catch (err) {
        next(err)
    }
}

// Other exports...
