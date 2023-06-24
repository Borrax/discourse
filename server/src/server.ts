import express from 'express'
import { attachRoutes } from './routes/routes'
import { initGeneralMiddlewares } from './middlewares/init'

export const app = express()

initGeneralMiddlewares(app)
attachRoutes(app)
