import type { Application } from 'express'
import { UserController} from '../controllers/userController'

export const attachUserRoutes = (app: Application) => {
  const baseUrl = '/user'

  app.post(baseUrl + '/register', UserController.register)
}
