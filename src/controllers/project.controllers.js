import { ModelController } from './model.controllers.js'

import { ProjectSchema } from '../schemas/project.schemas.js'

import { isValidPositiveInteger } from '../utils/validates.js'

export class ProjectController extends ModelController {
  constructor ({ model }) {
    super({ model, schema: ProjectSchema, title: 'Project', formatID: isValidPositiveInteger })
  }
}
