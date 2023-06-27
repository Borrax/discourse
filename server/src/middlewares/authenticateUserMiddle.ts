import type { Request, Response, NextFunction } from 'express'

import { JWTConfig } from '../configs/jwtConfig'
import { createErrorResponseObj } from '../utils/serverResponseMethods'

const { JWT_COOKIE_NAME } = JWTConfig

export const authenticateUserMiddle = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies[JWT_COOKIE_NAME]
  
  if(!token) {
    res.status(400).json(createErrorResponseObj('No auth token provided'))
    return
  }

  next()
}
