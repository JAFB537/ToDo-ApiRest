import { messages } from '../utils/messages.js'

import { ModelController } from './model.controllers.js'

import { UserSchema } from '../schemas/user.schemas.js'

import { isValidUUID } from '../utils/validates.js'

import { BaseError } from '../middlewares/baseError.js'

export class UserController extends ModelController {
  constructor ({ model }) {
    super({ model, schema: UserSchema, title: 'User', formatID: isValidUUID })
  }

  getLogin = async (req, res, next) => {
    const input = req.body
    try {
      const validate = this.schema.validatePartial(req.body)

      if (!validate.success) {
        const validErrors = JSON.parse(validate.error.message)

        validErrors.sort((a, b) => (a.code > b.code) ? 1 : -1)
        throw new BaseError(messages.error.INVALID_REQUEST_DATA_ERROR, 402, validErrors, true)
      }

      const result = await this.model.getLogin({ input })

      if ((!result || result.length === 0)) {
        throw new BaseError(messages.error.NOT_FOUND(this.title), 404, 'Invalid username or password', true)
      }

      res.status(200).json({ message: messages.success.GOTTEN(this.title), status: 200, data: result })
    } catch (error) {
      next(error)
    }
  }
}
