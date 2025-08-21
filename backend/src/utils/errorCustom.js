export default class ApiError extends Error {
      constructor(statusCode, message) {
            super(message)
            this.name = 'API error'
            this.statusCode = statusCode
            Error.captureStackTrace(this, this.constructor)
      }
} 