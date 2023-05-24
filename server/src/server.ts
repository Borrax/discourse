import express from 'express'
import { attachRoutes } from './routes/routes'
import { initializeDb } from './db/db'

const app = express()
const PORT: number = 8000

attachRoutes(app)

initializeDb()

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
