import express from 'express'
import { attachRoutes } from './routes/routes'
import { initializeDb } from './db/db'
import { initializeMiddlewares } from './middlewares/middlewares'

const app = express()
const PORT: number = 8000

initializeDb()
initializeMiddlewares(app)
attachRoutes(app)

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
