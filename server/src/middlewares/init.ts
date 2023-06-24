import type { Application } from 'express';

import { json } from 'express'
import { errorHandlerMiddle } from './errorHandlerMiddle'

export const initGeneralMiddlewares = (app: Application): void => {
  const jsonMiddle = json()

  app.use(jsonMiddle)
  app.use(errorHandlerMiddle)
}
