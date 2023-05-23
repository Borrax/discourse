import express from 'express'
import { attachRoutes } from './routes/routes'

const app = express()
const PORT: number = 3000

attachRoutes(app)

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
