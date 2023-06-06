export default async (): Promise<void> => {
  await new Promise((resolve, _reject) => {
    globalThis.__SERVER__.close(() => {
      console.log('Server closed')
      resolve(null)
    })
  })
  await globalThis.__DB__.close()
}
