import { Router } from 'express'

import { EventController } from '../controllers/event.controllers.js'

export const createEventRouter = ({ model }) => {
  const router = Router()

  const controller = new EventController({ model })

  router.get('/', controller.getAll)

  router.get('/:id', controller.getById)

  router.post('/', controller.create)

  router.put('/:id', controller.update)

  router.delete('/:id', controller.delete)

  return router
}
