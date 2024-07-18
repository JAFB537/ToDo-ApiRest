import { ModelController } from './model.controllers.js'

import { IssueSchema } from '../schemas/issue.schemas.js'

import { isValidPositiveInteger } from '../utils/validates.js'

export class IssueController extends ModelController {
  constructor ({ model }) {
    super({ model, schema: IssueSchema, title: 'Issue', formatID: isValidPositiveInteger })
  }
}
