import type { NextFunction, Request, Response } from 'express'

export const errorHandlerMiddle = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error handler middleware:\n" + err)

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
