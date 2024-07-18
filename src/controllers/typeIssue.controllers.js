import { ModelController } from './model.controllers.js'

import { TypeIssueSchema } from '../schemas/typeIssue.schemas.js'

import { isValidPositiveInteger } from '../utils/validates.js'

export class TypeIssueController extends ModelController {
  constructor ({ model }) {
    super({ model, schema: TypeIssueSchema, title: 'Type Issue', formatID: isValidPositiveInteger })
  }
}
