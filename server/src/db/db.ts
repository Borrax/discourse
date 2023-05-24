import mongoose from 'mongoose'

export const connectToDb = async () => {
const connectionUrl = 'mongodb://127.0.0.1:27017/discourse'
  await mongoose.connect(connectionUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err))
}
