import { initializeDb } from './db/db'
import { app } from './server'
const PORT: number = 8000

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'production'
}

initializeDb()

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
  console.log('Node env:', process.env.NODE_ENV)
})
