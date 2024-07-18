/* --------------------------- Imports  -------------------------- */

// Express
import express, { json } from 'express'

// Cors
import { corsMiddleware } from './middlewares/cors.js'
import { requestLogger } from './middlewares/requestLogger.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { unknownEndpoint } from './middlewares/unknownEndpoint.js'

// Environment Variables
import 'dotenv/config'

// Routes
import { createRouter } from './routes/routes.js'

/* --------------------------- Configuration  -------------------------- */

const app = express()

// Add Express Json Middleware
app.use(json())

// MIDDLEWARES
app.use(corsMiddleware())
app.use(requestLogger)

// Disable x-powered-by HTTP head
app.disable('x-powered-by')

// Add Routes
// app.use(createRouter({ db: 'mssql' }))
createRouter({ app })

app.use(errorHandler)
app.use(unknownEndpoint)

export default app
