import type { Application } from 'express';

import { json } from 'express'
import { errorHandlerMiddle } from './errorHandlerMiddle'

/**
* @function Makes the express app use different middlewares that
* need to be present at any server request
*/ 
export const initGeneralMiddlewares = (app: Application): void => {
  const jsonMiddle = json()

  app.use(jsonMiddle)
  app.use(errorHandlerMiddle)
}
