import { ModelController } from './model.controllers.js'

import { StateSchema } from '../schemas/state.schemas.js'

import { isValidPositiveInteger } from '../utils/validates.js'

export class StateController extends ModelController {
  constructor ({ model }) {
    super({ model, schema: StateSchema, title: 'State', formatID: isValidPositiveInteger })
  }
}
