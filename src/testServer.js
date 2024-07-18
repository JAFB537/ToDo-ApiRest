/* --------------------------- Imports  -------------------------- */

// Express
import express from 'express'

// supertest
import supertest from 'supertest'

/* --------------------------- Configuration  -------------------------- */

export function testServer (routes) {
  const app = express()
  routes(app)
  return supertest(app)
}
