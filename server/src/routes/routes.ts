import type { Application, Response } from "express"
import express from 'express'
import path from 'path'

export const attachRoutes = (app: Application) => {   
  app.use(express.static(path.resolve(__dirname, '../../../client/dist/')))

  app.get('/', (_req, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../../client/dist/index.html'))
  })
} 
