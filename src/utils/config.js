import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const DEFAULT_DB_OPTIONS = {
  ENCRYPT: process.env.DB_OPTIONS_ENCRYPT ? process.env.DB_OPTIONS_ENCRYPT === 'true' : true,
  TRUST_SERVER_CERTIFICATE: process.env.DB_OPTIONS_TRUST_SERVER_CERTIFICATE ? process.env.DB_OPTIONS_TRUST_SERVER_CERTIFICATE === 'true' : false
}

const MSSQL_DEFAULT_CONFIG = {
  DB_USER: process.env.DB_USER || 'default_user',
  DB_PASSWORD: process.env.DB_PASSWORD || 'default_password',
  DB_SERVER: process.env.DB_SERVER || 'localhost',
  DB_DATABASE: process.env.DB_DATABASE || 'default_database',
  DB_OPTIONS: { ...DEFAULT_DB_OPTIONS }
}

export {
  MSSQL_DEFAULT_CONFIG
}
