import { Router } from 'express'

import { UserProjectController } from '../controllers/userProject.controllers.js'

export const createUserProjectRouter = ({ model }) => {
  const router = Router()

  const controller = new UserProjectController({ model })

  router.get('/', controller.getAll)

  router.get('/:id', controller.getById)

  router.get('/user/:id', controller.getByUserId)

  router.get('/project/:id', controller.getByProjectId)

  router.post('/', controller.create)

  router.delete('/:id', controller.delete)

  return router
}
