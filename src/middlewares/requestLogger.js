import { logger } from '../utils/logger.js'

const requestLogger = (request, response, next) => {
  logger.info('--------------------------------------------------------------------')
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('--------------------------------------------------------------------')
  next()
}

export {
  requestLogger
}
