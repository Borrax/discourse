import mongoose from 'mongoose'

const connectToDb = (connectionStr: string): void => {
  mongoose.connect(connectionStr).then(() => { console.log('Connected to db:', mongoose.connection.name) })
    .catch(err => { console.error(err) })
}

export const initializeDb = (): void => {
  const dbUrl = 'mongodb://127.0.0.1:27017/discourse'
  const dbTestDevUrl = 'mongodb://127.0.0.1:27017/discourseDevNTest'

  mongoose.connection.on('connecting', () => {
    console.log('Connecting to the DB')
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  if (process.env.NODE_ENV === 'test') {
    connectToDb(dbUrl)
  } else {
    connectToDb(dbTestDevUrl)
  }
}
