import type { Application } from 'express'
import { UserController } from '../controllers/userController'

export const attachUserRoutes = (app: Application, apiBaseUrl: string): void => {
  const userBaseApiUrl = apiBaseUrl + '/user'

  app.post(userBaseApiUrl + '/register', UserController.register)
}
