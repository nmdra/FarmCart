import express from 'express'

const PORT = process.env.PORT || 8000

// connect to MongoDB
const app = express()

app.all('*', (_req, res) => {
  res.status(404).json({
    statusCode: 404,
  })
})

app
  .listen(PORT, () => {
    console.log(`Server currently is running on port ${PORT}`)
  })
  .on('error', (error) => {
    console.error(`Error starting server: ${error.message}`)
  })
