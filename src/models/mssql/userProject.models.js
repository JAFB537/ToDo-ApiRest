import { getConnection } from '../../database/mssql/connection.js'
import sql from 'mssql'

import { UserProjectFormat } from '../../utils/formats.js'

const pool = await getConnection()

export class UserProjectModel {
  static async getAll () {
    const result = await pool.request().query(`
      SELECT 
        up.UserProjectID,
        up.UserID,
        u.Name AS UserName,
        u.LastName AS UserLastName,
        u.Age AS UserAge,
        u.PhoneNumber AS UserPhoneNumber,
        u.UserName AS UserUserName,
        u.Password AS UserPassword,
        u.Email AS UserEmail,
        u.Image AS UserImage,
        u.Country AS UserCountry,
        up.ProjectID,
        p.Name AS ProjectName,
        p.Description AS ProjectDescription,
        p.StartDate AS ProjectStartDate,
        p.EndDate AS ProjectEndDate,
        p.DateCreated AS ProjectDateCreated,
        ps.StateID AS ProjectStateID,
        ps.Name AS ProjectStateName
      FROM 
          UserProject up
      INNER JOIN 
          [User] u ON up.UserID = u.UserID
      INNER JOIN 
          Project p ON up.ProjectID = p.ProjectID
      INNER JOIN 
          State ps ON p.StateID = ps.StateID;
    `)

    return UserProjectFormat(result.recordset)
  }

  static async getById ({ id }) {
    const result = await pool.request().input('UserProjectID', sql.Int, id)
      .query(`
        SELECT 
          up.UserProjectID,
          up.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName,
          u.Age AS UserAge,
          u.PhoneNumber AS UserPhoneNumber,
          u.UserName AS UserUserName,
          u.Password AS UserPassword,
          u.Email AS UserEmail,
          u.Image AS UserImage,
          u.Country AS UserCountry,
          up.ProjectID,
          p.Name AS ProjectName,
          p.Description AS ProjectDescription,
          p.StartDate AS ProjectStartDate,
          p.EndDate AS ProjectEndDate,
          p.DateCreated AS ProjectDateCreated,
          ps.StateID AS ProjectStateID,
          ps.Name AS ProjectStateName
        FROM 
            UserProject up
        INNER JOIN 
            [User] u ON up.UserID = u.UserID
        INNER JOIN 
            Project p ON up.ProjectID = p.ProjectID
        INNER JOIN 
            State ps ON p.StateID = ps.StateID
        WHERE up.UserProjectID = @UserProjectID;
      `)

    return UserProjectFormat(result.recordset)
  }

  static async getByUserId ({ id }) {
    const result = await pool
      .request()
      .input('UserID', sql.UniqueIdentifier, id).query(`
        SELECT 
          up.UserProjectID,
          up.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName,
          u.Age AS UserAge,
          u.PhoneNumber AS UserPhoneNumber,
          u.UserName AS UserUserName,
          u.Password AS UserPassword,
          u.Email AS UserEmail,
          u.Image AS UserImage,
          u.Country AS UserCountry,
          up.ProjectID,
          p.Name AS ProjectName,
          p.Description AS ProjectDescription,
          p.StartDate AS ProjectStartDate,
          p.EndDate AS ProjectEndDate,
          p.DateCreated AS ProjectDateCreated,
          ps.StateID AS ProjectStateID,
          ps.Name AS ProjectStateName
        FROM 
            UserProject up
        INNER JOIN 
            [User] u ON up.UserID = u.UserID
        INNER JOIN 
            Project p ON up.ProjectID = p.ProjectID
        INNER JOIN 
            State ps ON p.StateID = ps.StateID
        WHERE u.UserID = @UserID;
      `)

    return UserProjectFormat(result.recordset)
  }

  static async getByProjectId ({ id }) {
    const result = await pool.request().input('ProjectID', sql.Int, id).query(`
        SELECT 
          up.UserProjectID,
          up.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName,
          u.Age AS UserAge,
          u.PhoneNumber AS UserPhoneNumber,
          u.UserName AS UserUserName,
          u.Password AS UserPassword,
          u.Email AS UserEmail,
          u.Image AS UserImage,
          u.Country AS UserCountry,
          up.ProjectID,
          p.Name AS ProjectName,
          p.Description AS ProjectDescription,
          p.StartDate AS ProjectStartDate,
          p.EndDate AS ProjectEndDate,
          p.DateCreated AS ProjectDateCreated,
          ps.StateID AS ProjectStateID,
          ps.Name AS ProjectStateName
        FROM 
            UserProject up
        INNER JOIN 
            [User] u ON up.UserID = u.UserID
        INNER JOIN 
            Project p ON up.ProjectID = p.ProjectID
        INNER JOIN 
            State ps ON p.StateID = ps.StateID
        WHERE p.ProjectID = @ProjectID;
    
      `)

    return UserProjectFormat(result.recordset)
  }

  static async create ({ input }) {
    const { UserID, ProjectID } = input

    const result = await pool
      .request()
      .input('UserID', sql.UniqueIdentifier, UserID)
      .input('ProjectID', sql.Int, ProjectID).query(`
        INSERT INTO [UserProject] (UserID, ProjectID) 
        VALUES (@UserID, @ProjectID);
      `)

    return result
  }

  static async delete ({ id }) {
    const result = await pool
      .request()
      .input('UserProjectID', sql.Int, id)
      .query('DELETE FROM [UserProject] WHERE UserProjectID = @UserProjectID;')

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true
    }

    return false
  }
}
