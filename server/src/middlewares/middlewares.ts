import type { Application, NextFunction,
  Request, Response } from 'express'
import { json } from 'express'

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)

  if (err.status === 400) {
    res.status(400).json({ error: 'Invalid data format sent to the server' })
    return
  }
   
  if (err) {
    res.status(500).json({ error: 'Internal server error'})
    return
  }

  next()
}

export const initializeMiddlewares = (app: Application) => {
  app.use(json())
  app.use(errorHandler)
}
