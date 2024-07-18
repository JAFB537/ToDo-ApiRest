import { ModelController } from './model.controllers.js'

import { EventSchema } from '../schemas/event.schemas.js'

import { isValidPositiveInteger } from '../utils/validates.js'

export class EventController extends ModelController {
  constructor ({ model }) {
    super({ model, schema: EventSchema, title: 'Event', formatID: isValidPositiveInteger })
  }
}
