import express from 'express'
import { attachRoutes } from './routes/routes'
import { connectToDb } from './db/db'

const app = express()
const PORT: number = 8000

attachRoutes(app)

void connectToDb()

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
