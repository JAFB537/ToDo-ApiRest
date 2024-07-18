import app from './app.js'

import { logger } from './utils/logger.js'

const PORT = process.env.PORT || 3000

export const server = app.listen(PORT, () => {
  logger.info(`Start Server On Port ${PORT}`)
})

export default app
