const { CustomError } = require('../helpers/CustomError')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ msg: `Something went wrong, try again` })
}

module.exports = { errorHandlerMiddleware }