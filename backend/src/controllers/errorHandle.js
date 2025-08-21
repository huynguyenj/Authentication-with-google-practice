import { StatusCodes } from 'http-status-codes'
export const errorMiddleware = (err, req, res, next) => {
      if (!err.statusCode) err.statusCode =  StatusCodes.INTERNAL_SERVER_ERROR
      const errorRes = {
            status: err.statusCode,
            message: err.message
      }
      res.status(errorRes.status).json(errorRes)
}