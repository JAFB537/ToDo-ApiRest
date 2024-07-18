import { getConnection } from '../../database/mssql/connection.js'
import sql from 'mssql'

import { ProjectFormat } from '../../utils/formats.js'

const pool = await getConnection()

export class ProjectModel {
  static async getAll () {
    const result = await pool.request().query(`
      SELECT 
        p.ProjectID,
        p.Name AS ProjectName,
        p.Description AS ProjectDescription,
        FORMAT(p.StartDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectStartDate,
        FORMAT(p.EndDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectEndDate,
        FORMAT(p.DateCreated, 'dd/MM/yyyy HH:mm:ss') AS ProjectDateCreated,
        s.StateID,
        s.Name AS StateName,
        u.UserID,
        u.Name AS UserName,
        u.LastName AS UserLastName,
        u.Age AS UserAge,
        u.PhoneNumber AS UserPhoneNumber,
        u.UserName AS UserUserName,
        u.Email AS UserEmail,
        u.Image AS UserImage,
        u.Country AS UserCountry
      FROM 
          Project p
      INNER JOIN 
          State s ON p.StateID = s.StateID
      INNER JOIN 
          [User] u ON p.UserID = u.UserID;
    `)

    return ProjectFormat(result.recordset)
  }

  static async getById ({ id }) {
    const result = await pool.request().input('ProjectID', sql.Int, id).query(`
        SELECT 
          p.ProjectID,
          p.Name AS ProjectName,
          p.Description AS ProjectDescription,
          FORMAT(p.StartDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectStartDate,
          FORMAT(p.EndDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectEndDate,
          FORMAT(p.DateCreated, 'dd/MM/yyyy HH:mm:ss') AS ProjectDateCreated,
          s.StateID,
          s.Name AS StateName,
          u.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName,
          u.Age AS UserAge,
          u.PhoneNumber AS UserPhoneNumber,
          u.UserName AS UserUserName,
          u.Email AS UserEmail,
          u.Image AS UserImage,
          u.Country AS UserCountry
        FROM 
            Project p
        INNER JOIN 
            State s ON p.StateID = s.StateID
        INNER JOIN 
            [User] u ON p.UserID = u.UserID
        WHERE p.ProjectID = @ProjectID;
      `)

    if (result.recordset.length === 0) return null

    return ProjectFormat(result.recordset)
  }

  static async create ({ input }) {
    const { Name, Description, StartDate, EndDate, StateID, UserID } = input

    const result = await pool
      .request()
      .input('Name', sql.VarChar, Name)
      .input('Description', sql.VarChar, Description)
      .input('StartDate', sql.Date, StartDate)
      .input('EndDate', sql.Date, EndDate)
      .input('StateID', sql.Int, StateID)
      .input('UserID', sql.UniqueIdentifier, UserID).query(`
        INSERT INTO [Project] (Name, Description, StartDate, EndDate, StateID, UserID, DateCreated) 
        VALUES (@Name, @Description, @StartDate, @EndDate, @StateID, @UserID, GETDATE());
      `)

    return result
  }

  static async update ({ id, input }) {
    const { Name, Description, StartDate, EndDate, StateID, UserID } = input

    const result = await pool
      .request()
      .input('ProjectID', sql.Int, id)
      .input('Name', sql.VarChar, Name)
      .input('Description', sql.VarChar, Description)
      .input('StartDate', sql.Date, StartDate)
      .input('EndDate', sql.Date, EndDate)
      .input('StateID', sql.Int, StateID)
      .input('UserID', sql.UniqueIdentifier, UserID).query(`
        UPDATE [Project] SET 
        Name = @Name,
        Description = @Description,
        StartDate = @StartDate,
        EndDate = @EndDate,
        StateID = @StateID,
        UserID = @UserID
        WHERE ProjectID = @ProjectID;
      `)

    return result
  }

  static async delete ({ id }) {
    const result = await pool
      .request()
      .input('ProjectID', sql.Int, id)
      .query('DELETE FROM [Project] WHERE ProjectID = @ProjectID;')

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true
    }

    return false
  }
}
