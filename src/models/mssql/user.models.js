import { getConnection } from '../../database/mssql/connection.js'

import sql from 'mssql'

import { UserFormat } from '../../utils/formats.js'

const pool = await getConnection()

export class UserModel {
  static async getAll () {
    const result = await pool.request().query(`
      SELECT 
          UserID,
          Name,
          LastName,
          Age,
          PhoneNumber,
          UserName,
          Email,
          Image,
          Country
      FROM 
          [User];
    `)

    return UserFormat(result.recordset)
  }

  static async getById ({ id }) {
    const result = await pool
      .request()
      .input('UserID', sql.UniqueIdentifier, id).query(`
        SELECT 
            UserID,
            Name,
            LastName,
            Age,
            PhoneNumber,
            UserName,
            Email,
            Image,
            Country
        FROM 
            [User]
        WHERE UserID = @UserID;
      `)

    if (result.length === 0) return null

    return UserFormat(result.recordset)
  }

  static async getLogin ({ input }) {
    const { UserName, Password } = input

    const result = await pool
      .request()
      .input('UserName', sql.VarChar, UserName)
      .input('Password', sql.VarChar, Password)
      .query(`
        SELECT 
            UserID,
            Name,
            LastName,
            Age,
            PhoneNumber,
            UserName,
            Email,
            Image,
            Country
        FROM 
            [User]
        WHERE UserName = @UserName AND Password = @Password
      `)

    if (result.recordset.length === 0) return null

    return UserFormat(result.recordset)
  }

  static async create ({ input }) {
    const {
      Name,
      LastName,
      Age,
      PhoneNumber,
      UserName,
      Password,
      Email,
      Image,
      Country
    } = input

    const result = await pool
      .request()
      .input('Name', sql.VarChar, Name)
      .input('LastName', sql.VarChar, LastName)
      .input('Age', sql.Int, Age)
      .input('PhoneNumber', sql.VarChar, PhoneNumber)
      .input('UserName', sql.VarChar, UserName)
      .input('Password', sql.VarChar, Password)
      .input('Email', sql.VarChar, Email)
      .input('Image', sql.VarChar, Image)
      .input('Country', sql.VarChar, Country).query(`
          INSERT INTO [User] (Name, LastName, Age, PhoneNumber, UserName, Password, Email, Image, Country) 
          VALUES (@Name, @LastName, @Age, @PhoneNumber, @UserName, @Password, @Email, @Image, @Country);
      `)
    return result
  }

  static async update ({ id, input }) {
    const {
      Name,
      LastName,
      Age,
      PhoneNumber,
      UserName,
      Password,
      Email,
      Image,
      Country
    } = input

    const result = await pool
      .request()
      .input('UserID', sql.UniqueIdentifier, id)
      .input('Name', sql.VarChar, Name)
      .input('LastName', sql.VarChar, LastName)
      .input('Age', sql.Int, Age)
      .input('PhoneNumber', sql.VarChar, PhoneNumber)
      .input('UserName', sql.VarChar, UserName)
      .input('Password', sql.VarChar, Password)
      .input('Email', sql.VarChar, Email)
      .input('Image', sql.VarChar, Image)
      .input('Country', sql.VarChar, Country).query(`
      UPDATE [User] SET 
      Name = @Name,
      LastName = @LastName,
      Age = @Age,
      PhoneNumber = @PhoneNumber,
      UserName = @UserName,
      Password = @Password,
      Email = @Email,
      Image = @Image,
      Country = @Country
      WHERE UserID = @UserID;
    `)
    return result
  }

  static async delete ({ id }) {
    const result = await pool
      .request()
      .input('UserID', sql.UniqueIdentifier, id)
      .query('DELETE FROM [User] WHERE UserID = @UserID;')

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true
    }

    return false
  }
}
