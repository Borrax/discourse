import mongoose from 'mongoose'

/**
* @type The type of the callback function that is called after
* the db is connected
*/
type CallbackFunType = () => void

const connectToDb = (connectionStr: string, successCb: CallbackFunType): void => {
  mongoose.connect(connectionStr).then(() => {
    console.log('Connected to db:', mongoose.connection.name)
    successCb()
  })
    .catch(err => { console.error(err) })
}

/**
* @function A function that connects the server to the database
* @param successCb - A callback function that is called when the
* db is connected
*/
export const initializeDb = (successCb: CallbackFunType = () => {}): void => {
  const dbUrl = 'mongodb://127.0.0.1:27017/discourse'
  const dbTestDevUrl = 'mongodb://127.0.0.1:27017/discourseDevNTest'

  mongoose.connection.on('connecting', () => {
    console.log('Connecting to the DB')
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  if (process.env.NODE_ENV === 'production') {
    connectToDb(dbUrl, successCb)
  } else {
    connectToDb(dbTestDevUrl, successCb)
  }
}
