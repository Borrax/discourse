import mongoose from 'mongoose'

const connectToDb = async () => {
  const dbUrl = 'mongodb://127.0.0.1:27017/discourse'
  return await mongoose.connect(dbUrl)
}

export const initializeDb = () => {
  mongoose.connection.on('connecting', () => {
    console.log('Connecting to the DB')
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  connectToDb().then(() => console.log('Connected to the DB'))
  .catch(err => console.error(err))
}
