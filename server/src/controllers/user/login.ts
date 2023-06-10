import type { RequestHandler } from 'express'

export const login = (((_req, res) => {
  res.json({ msg: 'this is the logn route' })
}) as RequestHandler)
