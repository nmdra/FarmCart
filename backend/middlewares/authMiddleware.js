import jwt from 'jsonwebtoken'
import CustomError from '../utils/customError.js'
import User from '../model/userModel.js'

const protect = async (req, res, next) => {
    let token = req.cookies.jwt

    try {
        if (token) {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.userId).select('-password')

            if (!req.user) {
                throw new CustomError('User not found', 403)
            }

            next()
        } else {
            throw new CustomError('Not authorized. No token provided', 401)
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new CustomError('Invalid token signature', 401))
        }
        next(error)
    }
}

export default protect
