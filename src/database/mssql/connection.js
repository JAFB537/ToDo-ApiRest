import sql from 'mssql'

// Environment Variables
import { MSSQL_DEFAULT_CONFIG } from '../../utils/config.js'

const DEFAULT_CONFIG = {
  user: MSSQL_DEFAULT_CONFIG.DB_USER,
  password: MSSQL_DEFAULT_CONFIG.DB_PASSWORD,
  server: MSSQL_DEFAULT_CONFIG.DB_SERVER,
  database: MSSQL_DEFAULT_CONFIG.DB_DATABASE,
  options: {
    encrypt: MSSQL_DEFAULT_CONFIG.DB_OPTIONS.ENCRYPT,
    trustServerCertificate: MSSQL_DEFAULT_CONFIG.DB_OPTIONS.TRUST_SERVER_CERTIFICATE
  }
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

export const getConnection = async () => {
  try {
    const pool = await sql.connect(connectionString)
    return pool
  } catch (error) {
    console.error(error)
  }
}
