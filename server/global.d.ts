import type { IncomingMessage, Server, ServerResponse } from 'http'
import mongoose from 'mongoose'

declare global {
  namespace globalThis {
    var __SERVER__: Server<typeof IncomingMessage, typeof ServerResponse>
    var __DB__: mongoose.Connection
  }
}
