import type { Application } from 'express'

import { createSuccessResponseObj } from '../utils/serverResponseMethods'
import { authenticateUserMiddle } from '../middlewares/authenticateUserMiddle'

/**
* @function Attaches all the routes that are meant for testing
*/
export const attachTestRoutes = (app: Application): void => {
  const baseUrl = '/test'

  // route for testing incoming json post reuquests
  app.post(baseUrl + '/json', (req, res) => {
    res.json(req.body)
  })

  app.get(baseUrl + '/protected', authenticateUserMiddle, (_req, res) => {
    res.json(createSuccessResponseObj({ msg: 'Reached the protected endpoint' }))
  })

  app.get(baseUrl + '/cookieParser', (req, res) => {
    res.json(createSuccessResponseObj({ cookies: req.cookies }))
  })
}
