import { Router } from 'express'

import { StateController } from '../controllers/state.controllers.js'

export const createStateRouter = ({ model }) => {
  const router = Router()

  const controller = new StateController({ model })

  router.get('/', controller.getAll)

  router.get('/:id', controller.getById)

  router.post('/', controller.create)

  router.put('/:id', controller.update)

  router.delete('/:id', controller.delete)

  return router
}
