import { logger } from '../utils/logger.js'
import { messages } from '../utils/messages.js'

export const errorHandler = (error, request, response, next) => {
  logger.error(error.stack)

  const httpCode = error.status || 500

  if (typeof error.getErrorDetailsWithoutStack === 'function') {
    response.status(httpCode).json(error.getErrorDetailsWithoutStack())
  } else {
    const description = error.message || 'Something went wrong'
    response.status(httpCode).json({
      name: 'Error',
      message: messages.error.SERVER_ERROR,
      status: httpCode,
      description,
      isOperational: true
    })
  }
}
