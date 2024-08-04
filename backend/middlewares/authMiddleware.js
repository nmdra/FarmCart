import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect = async (req, res, next) => {
    let token = req.cookies.jwt

    try {
        if (token) {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.userId).select('-password')

            if (!req.user) {
                res.status(403)
                throw new Error('User not found')
            }

            next()
        } else {
            res.status(401)
            throw new Error('Not authorized. No token provided', 401)
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401)
            return next(new Error('Invalid token signature'))
        }
        next(error)
    }
}

export default protect
