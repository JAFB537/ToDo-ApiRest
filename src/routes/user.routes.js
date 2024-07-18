import { Router } from 'express'

import { UserController } from '../controllers/user.controllers.js'

export const createUserRouter = ({ model, title = 'USER' }) => {
  const router = Router()

  const userController = new UserController({ model, title })

  router.get('/', userController.getAll)

  router.get('/:id', userController.getById)

  router.post('/login', userController.getLogin)

  router.post('/', userController.create)

  router.put('/:id', userController.update)

  router.delete('/:id', userController.delete)

  return router
}
