import type { IncomingMessage, Server, ServerResponse } from 'http'
import type { Connection } from 'mongoose'

/* eslint no-var: "off" */
declare global {
  namespace globalThis {
    /**
    * @global An instance of the projects listening test server
    */
    var TEST_SERVER: Server<typeof IncomingMessage, typeof ServerResponse>
    /**
    * @global An instance of the connecntion to the test database
    */
    var TEST_DB: Connection
  }
}
