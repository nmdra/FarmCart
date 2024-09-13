const notFound = (req, res, next) => {
    const error = new Error(`Not Found -${req.originalUrl}`)
    res.status(404)
    next(error)
}
const errorHandler = (err, _req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    //check for Mongoose bad Object
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = `Resource not founded`
        statusCode = 404
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? 'null' : err.stack,
    })

    next()
}

export { errorHandler, notFound }
