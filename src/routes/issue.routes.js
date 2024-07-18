import { Router } from 'express'

import { IssueController } from '../controllers/issue.controllers.js'

export const createIssueRouter = ({ model }) => {
  const router = Router()

  const controller = new IssueController({ model })

  router.get('/', controller.getAll)

  router.get('/:id', controller.getById)

  router.post('/', controller.create)

  router.put('/:id', controller.update)

  return router
}
