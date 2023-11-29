export const post = async (url: string, payload: string):
Promise<Response> => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  })
}
