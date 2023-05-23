import type { Application, Response } from "express";

export const attachRoutes = (app: Application) => {   
  app.get('/', (_req, res: Response) => {
    res.send('Hello from express')
  })
} 
