import { messages } from '../utils/messages.js'
import { BaseError } from '../middlewares/baseError.js'

export class ModelController {
  constructor ({ model, schema, title = '', formatID }) {
    this.title = title
    this.model = model
    this.schema = schema
    this.formatID = formatID
  }

  getAll = async (req, res, next) => {
    try {
      const result = await this.model.getAll()
      res.status(200).json({ message: messages.success.GOTTEN(this.title), status: 200, data: result })
    } catch (error) {
      next(error)
    }
  }

  getById = async (req, res, next) => {
    const id = req.params.id
    try {
      if (!this.formatID(id)) {
        throw new BaseError(messages.error.INVALID_INPUT, 400, 'Invalid ID type or format.', true)
      }

      const result = await this.model.getById({ id })

      if ((!result || result.length === 0)) {
        throw new BaseError(messages.error.NOT_FOUND(this.title), 404, 'Record with ID provided not found.', true)
      }

      res.status(200).json({ message: messages.success.GOTTEN(this.title), status: 200, data: result[0] })
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    const input = req.body
    try {
      const validate = this.schema.validate(req.body)

      if (!validate.success) {
        const validErrors = JSON.parse(validate.error.message)

        validErrors.sort((a, b) => (a.code > b.code) ? 1 : -1)
        throw new BaseError(messages.error.INVALID_REQUEST_DATA_ERROR, 400, validErrors, true)
      }

      await this.model.create({ input })

      res.status(200).json({ message: messages.success.CREATED(this.title), status: 200 })
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res, next) => {
    const id = req.params.id
    const input = req.body
    try {
      const validate = this.schema.validatePartial(req.body)

      if (!validate.success) {
        const validErrors = JSON.parse(validate.error.message)

        validErrors.sort((a, b) => (a.code > b.code) ? 1 : -1)
        throw new BaseError(messages.error.INVALID_REQUEST_DATA_ERROR, 400, validErrors, true)
      }

      await this.model.update({ id, input })

      res.status(200).json({ message: messages.success.UPDATED(this.title), status: 200 })
    } catch (error) {
      next(error)
    }
  }

  delete = async (req, res, next) => {
    const id = req.params.id
    try {
      if (!this.formatID(id)) {
        throw new BaseError(messages.error.INVALID_INPUT, 400, 'Invalid ID type or format.', true)
      }

      const result = await this.model.delete({ id })

      if (!result) {
        throw new BaseError(messages.error.NOT_FOUND(this.title), 404, 'Record with ID provided not found.', true)
      }

      res.status(200).json({ message: messages.success.DELETED(this.title), status: 200 })
    } catch (error) {
      next(error)
    }
  }
}
