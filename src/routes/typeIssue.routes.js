import { Router } from 'express'

import { TypeIssueController } from '../controllers/typeIssue.controllers.js'

export const createTypeIssueRouter = ({ model }) => {
  const router = Router()

  const controller = new TypeIssueController({ model })

  router.get('/', controller.getAll)

  router.get('/:id', controller.getById)

  router.post('/', controller.create)

  router.put('/:id', controller.update)

  router.delete('/:id', controller.delete)

  return router
}
