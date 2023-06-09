import type { Application } from 'express'

import express from 'express'
import path from 'path'
import { attachUserRoutes } from './userRoutes'
import { attachTestRoutes } from './testRoutes'

/**
* @function A function responsible to attaching all the server routes to the express app
* @params app: The express app instance
*/
export const attachRoutes = (app: Application): void => {
  const staticDirDest = path.resolve(__dirname, '../../../../../client/dist/')
  app.use(express.static(staticDirDest))

  app.get('/', (_req, res) => {
    res.sendFile(path.join(staticDirDest, './index.html'))
  })

  attachUserRoutes(app)

  if (process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test') {
    attachTestRoutes(app)
  }
}
