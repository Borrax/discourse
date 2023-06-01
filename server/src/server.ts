import express from 'express'
import { attachRoutes } from './routes/routes'
import { initializeMiddlewares } from './middlewares/middlewares'

export const app = express()

initializeMiddlewares(app)
attachRoutes(app)
