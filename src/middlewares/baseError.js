class BaseError extends Error {
  /**
   * @param {string} name - (Optional)
   * @param {string} message
   * @param {number} httpCode
   * @param {string} description - (Optional)
   * @param {boolean} isOperational - (Optional)
   */
  constructor (message, status = 500, description = '', isOperational = true) {
    super(message)
    this.status = status || '500'
    this.description = description || ''
    this.isOperational = isOperational

    if (!status) {
      switch (status) {
        case HttpStatusCode.OK:
          this.name = 'OK'
          break
        case HttpStatusCode.BAD_REQUEST:
          this.name = 'BAD_REQUEST'
          break
        case HttpStatusCode.NOT_FOUND:
          this.name = 'NOT_FOUND'
          break
        case HttpStatusCode.INTERNAL_SERVER:
          this.name = 'INTERNAL_SERVER_ERROR'
          break
        default:
          this.name = 'UNKNOWN_ERROR'
          break
      }
    }

    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }

  toString = () => {
    return `${this.name} [${this.status}]: ${this.message}`
  }

  getErrorDetails = () => {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      description: this.description,
      isOperational: this.isOperational,
      stack: this.stack
    }
  }

  getErrorDetailsWithoutStack = () => {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      description: this.description,
      isOperational: this.isOperational
    }
  }
}

export const HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500
}

export {
  BaseError
}
