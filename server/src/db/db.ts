import mongoose from 'mongoose'

const connectToDb = (connectionStr: string, successsCb: () => void): void => {
  mongoose.connect(connectionStr).then(() => {
    console.log('Connected to db:', mongoose.connection.name)
    successsCb()
  })
    .catch(err => { console.error(err) })
}

/**
 * @function A function that connects the server to the database
* @param successCb - A function that is called when the server is successfully connected to the db
 */
export const initializeDb = (successCb = () => {}): void => {
  const dbUrl = 'mongodb://127.0.0.1:27017/discourse'
  const dbTestDevUrl = 'mongodb://127.0.0.1:27017/discourseDevNTest'

  mongoose.connection.on('connecting', () => {
    console.log('Connecting to the DB')
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  if (process.env.NODE_ENV === 'test') {
    connectToDb(dbUrl, successCb)
  } else {
    connectToDb(dbTestDevUrl, successCb)
  }
}
