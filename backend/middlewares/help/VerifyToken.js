import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookie.token
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: 'Not authorized' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded)
            return res
                .status(401)
                .json({ success: false, message: 'Not authorized' })
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log('error', error)
        return res
            .status(401)
            .json({ success: false, message: 'Not authorized' })
    }
}
