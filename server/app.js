const express = require('express')
const cors = require('cors')
const app = express()

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)

module.exports = app
