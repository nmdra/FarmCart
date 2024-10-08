import jwt from 'jsonwebtoken'

export const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '96h',
    })

    // Set the token as a cookie in the response
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 144 * 60 * 60 * 1000), // 2 days
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV !== 'development', // Cookie sent only over HTTPS if not in development
        sameSite: 'strict', // Prevents CSRF attacks
    })
}

export const tokenToVerify = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    })
}
