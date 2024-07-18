import { Router } from 'express'

import { ProjectController } from '../controllers/project.controllers.js'

export const createProjectRouter = ({ model }) => {
  const router = Router()

  const controller = new ProjectController({ model })

  router.get('/', controller.getAll)

  router.get('/:id', controller.getById)

  router.post('/', controller.create)

  router.put('/:id', controller.update)

  return router
}
