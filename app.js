const PORT = process.env.PORT || 3000
const express = require('express')
const taskRoutes = require('./routes/tasks')
const { connectDB } = require('./DB/conn')
const { notFound } = require('./middlewares/notFound')
const { errorHandlerMiddleware } = require('./middlewares/errorHandler')
require('dotenv').config()

const app = express()

//MIDDLEWARES
app.use(express.static('public'))
app.use(express.json())

//ROUTES
app.use('/api/v1/tasks', taskRoutes)
app.use(notFound)
app.use(errorHandlerMiddleware)

const startApp = async () => {
  try {
    await connectDB(process.env.DB_CONN_STRING)
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

startApp()