import { getConnection } from '../../database/mssql/connection.js'
import sql from 'mssql'

import { StateFormat } from '../../utils/formats.js'

const pool = await getConnection()

export class StateModel {
  static async getAll () {
    const result = await pool.request().query(`
      SELECT 
        s.StateID,
        s.Name
      FROM 
        State s
      ORDER BY s.StateID;
    `)

    return StateFormat(result.recordset)
  }

  static async getById ({ id }) {
    const result = await pool.request().input('StateID', sql.Int, id).query(`
        SELECT 
          s.StateID,
          s.Name
        FROM 
          State s
        WHERE s.StateID = @StateID;
      `)

    if (result.recordset.length === 0) return null

    return StateFormat(result.recordset)
  }

  static async create ({ input }) {
    const { Name } = input

    const result = await pool
      .request()
      .input('Name', sql.VarChar, Name)
      .query('INSERT INTO [State] (Name) VALUES (@Name);')

    return result
  }

  static async update ({ id, input }) {
    const { Name } = input

    const result = await pool
      .request()
      .input('StateID', sql.Int, id)
      .input('Name', sql.VarChar, Name)
      .query('UPDATE [State] SET Name = @Name WHERE StateID = @StateID;')

    return result
  }

  static async delete ({ id }) {
    const result = await pool
      .request()
      .input('StateID', sql.Int, id)
      .query('DELETE FROM [State] WHERE StateID = @StateID;')

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true
    }

    return false
  }
}
