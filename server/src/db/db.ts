import mongoose from 'mongoose'

const connectToDb = async () => {
  const connectionUrl = 'mongodb://127.0.0.1:27017/discourse'
  return await mongoose.connect(connectionUrl)
}

export const initializeDb = () => {
  connectToDb().then(() => console.log('connected to the db'))
  .catch(err => console.error(err))
}
