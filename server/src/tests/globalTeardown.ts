export default async (): Promise<void> => {
  await new Promise((resolve, _reject) => {
    globalThis.TEST_SERVER.close(() => {
      console.log('Server closed')
      resolve(null)
    })
  })
  await globalThis.TEST_DB.close()
}
