// Example content of farmerauthMiddleware.js
import jwt from 'jsonwebtoken'
import Farmer from '../models/farmerModel.js'

export const protect = async (req, res, next) => {
    let token
    console.log('Authenticating')

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
            req.user = await Farmer.findById(decoded.userId).select('-password')
            next()
        } catch (err) {
            console.error('Token verification failed:', error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}

// Other exports...
