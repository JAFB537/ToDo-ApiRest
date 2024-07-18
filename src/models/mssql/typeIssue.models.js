import { getConnection } from '../../database/mssql/connection.js'
import sql from 'mssql'

import { TypeIssueFormat } from '../../utils/formats.js'

const pool = await getConnection()

export class TypeIssueModel {
  static async getAll () {
    const result = await pool.request().query(`
      SELECT 
          TypeIssueID,
          Name,
          Description,
          Image,
          DateCreated
      FROM 
          TypeIssue;
    `)

    return TypeIssueFormat(result.recordset)
  }

  static async getById ({ id }) {
    const result = await pool.request().input('TypeIssueID', sql.Int, id)
      .query(`
      SELECT 
          TypeIssueID,
          Name,
          Description,
          Image,
          DateCreated
      FROM 
          TypeIssue
        WHERE TypeIssueID = @TypeIssueID;
      `)

    if (result.recordset.length === 0) return null

    return TypeIssueFormat(result.recordset)
  }

  static async create ({ input }) {
    const { Name, Description, Image } = input

    const result = await pool
      .request()
      .input('Name', sql.VarChar, Name)
      .input('Description', sql.VarChar, Description)
      .input('Image', sql.VarChar, Image)
      .query(
        'INSERT INTO [TypeIssue] (Name, Description, Image) VALUES (@Name, @Description, @Image);'
      )

    return result
  }

  static async update ({ id, input }) {
    const { Name, Description, Image } = input

    const result = await pool
      .request()
      .input('TypeIssueID', sql.Int, id)
      .input('Name', sql.VarChar, Name)
      .input('Description', sql.VarChar, Description)
      .input('Image', sql.VarChar, Image)
      .query(
        'UPDATE [TypeIssue] SET Name = @Name, Description = @Description, Image = @Image WHERE TypeIssueID = @TypeIssueID;'
      )

    return result
  }

  static async delete ({ id }) {
    const result = await pool
      .request()
      .input('TypeIssueID', sql.Int, id)
      .query('DELETE FROM [TypeIssue] WHERE TypeIssueID = @TypeIssueID;')

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true
    }

    return false
  }
}
