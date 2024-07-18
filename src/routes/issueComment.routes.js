import { Router } from 'express'

import { IssueCommentController } from '../controllers/issueComment.controllers.js'

export const createIssueCommentRouter = ({ model }) => {
  const router = Router()

  const controller = new IssueCommentController({ model })

  router.get('/', controller.getAll)

  router.get('/:id', controller.getById)

  router.get('/user/:id', controller.getByUserId)

  router.get('/issue/:id', controller.getByIssueId)

  router.post('/', controller.create)

  router.delete('/:id', controller.delete)

  return router
}
