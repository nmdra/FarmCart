import jwt from 'jsonwebtoken'
export const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export const generateTokenAndSetCookie = (res, ccmUserId) => {
    const token = jwt.sign({ ccmUserId }, process.env.JWT_SECRETE_KEY, {
        expiresIn: '7d',
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return token
}
