import { messages } from '../utils/messages.js'
import { ModelController } from './model.controllers.js'

import { IssueCommentSchema } from '../schemas/issueComment.schemas.js'

import { isValidPositiveInteger, isValidUUID } from '../utils/validates.js'
import { BaseError } from '../middlewares/baseError.js'

export class IssueCommentController extends ModelController {
  constructor ({ model }) {
    super({ model, schema: IssueCommentSchema, title: 'Issue Comment', formatID: isValidPositiveInteger })
  }

  getByIssueId = async (req, res, next) => {
    const id = req.params.id
    try {
      if (!this.formatID(id)) {
        throw new BaseError(messages.error.INVALID_INPUT, 400, 'Invalid ID type or format.', true)
      }

      const result = await this.model.getByIssueId({ id })

      if ((!result || result.length === 0)) {
        throw new BaseError(messages.error.NOT_FOUND(this.title), 404, 'Record with ID provided not found.', true)
      }

      res.status(200).json({ message: messages.success.GOTTEN(this.title), status: 200, data: result })
    } catch (error) {
      next(error)
    }
  }

  getByUserId = async (req, res, next) => {
    const id = req.params.id
    try {
      if (!isValidUUID(id)) {
        throw new BaseError(messages.error.INVALID_INPUT, 400, 'Invalid ID type or format.', true)
      }

      const result = await this.model.getByUserId({ id })

      if ((!result || result.length === 0)) {
        throw new BaseError(messages.error.NOT_FOUND(this.title), 404, 'Record with ID provided not found.', true)
      }

      res.status(200).json({ message: messages.success.GOTTEN(this.title), status: 200, data: result })
    } catch (error) {
      next(error)
    }
  }

  update = async (req, res) => {
    res.json({ message: messages.error.SERVER_ERROR })
  }
}
