import { Router } from 'express'

import { ProjectCommentController } from '../controllers/projectComment.controllers.js'

export const createProjectCommentRouter = ({ model }) => {
  const router = Router()

  const controller = new ProjectCommentController({ model })

  router.get('/', controller.getAll)

  router.get('/:id', controller.getById)

  router.get('/project/:id', controller.getByProjectId)

  router.get('/user/:id', controller.getByUserId)

  router.post('/', controller.create)

  router.delete('/:id', controller.delete)

  return router
}
