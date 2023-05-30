import { Application } from "express";

/**
* @function Attaches all the routes that are meant for testing
*/
export const attachTestRoutes = (app: Application): void => {
  const baseUrl = '/test'

  // route for testing incoming json post reuquests
  app.post(baseUrl + '/json', (req, res) => {
    res.json(req.body)
  })
}
