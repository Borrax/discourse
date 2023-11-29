/**
* @function Makes an http POST request to the server
*
* @param url - The route the post request needs to be done to
* @param payload - A string which will be in the body of the request
* @returns A promise with the server's response
*/
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
