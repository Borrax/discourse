import type { Application } from 'express'
import express from 'express'
import path from 'path'

const staticDirDest = path.resolve(__dirname, '../../../client/dist/')

/**
* @function A function responsible to attaching all the server routes to the express app
* @params app: The express app instance
*/
export const attachRoutes = (app: Application): void => {
  app.use(express.static(staticDirDest))

  app.get('/', (_req, res) => {
    res.sendFile(path.join(staticDirDest, './index.html'))
  })
}
