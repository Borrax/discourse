import type { Response } from 'express'
import express from 'express'

const app = express()
const PORT: number = 3000

app.get('/', (_req, res: Response) => {
  res.send('Hello from express')
})

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
