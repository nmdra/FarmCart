import jwt from 'jsonwebtoken'

export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    })

    // Set the token as a cookie in the response
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 days
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
    })

    // Return the token explicitly as part of the response body
    return token
}
