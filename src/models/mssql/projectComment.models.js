import { getConnection } from '../../database/mssql/connection.js'
import sql from 'mssql'

import { ProjectCommentFormat } from '../../utils/formats.js'

const pool = await getConnection()

export class ProjectCommentModel {
  static async getAll () {
    const result = await pool.request().query(`
        SELECT 
          pc.ProjectCommentID,
          pc.Description AS CommentDescription,
          pc.UserID AS CommentUserID,
          pc.ProjectID AS CommentProjectID,
          u.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName,
          u.Age AS UserAge,
          u.PhoneNumber AS UserPhoneNumber,
          u.UserName AS UserUserName,
          u.Email AS UserEmail,
          u.Image AS UserImage,
          u.Country AS UserCountry,
          p.ProjectID,
          p.Name AS ProjectName,
          p.Description AS ProjectDescription,
          p.StartDate AS ProjectStartDate,
          p.EndDate AS ProjectEndDate,
          p.DateCreated AS ProjectDateCreated,
          s.StateID,
          s.Name AS StateName
        FROM 
            ProjectComment pc
        INNER JOIN 
            [User] u ON pc.UserID = u.UserID
        INNER JOIN 
            Project p ON pc.ProjectID = p.ProjectID
        INNER JOIN 
            State s ON p.StateID = s.StateID;
      `)

    return ProjectCommentFormat(result.recordset)
  }

  static async getById ({ id }) {
    const result = await pool.request().input('ProjectCommentID', sql.Int, id)
      .query(`
        SELECT 
          pc.ProjectCommentID,
          pc.Description AS CommentDescription,
          pc.UserID AS CommentUserID,
          pc.ProjectID AS CommentProjectID,
          u.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName,
          u.Age AS UserAge,
          u.PhoneNumber AS UserPhoneNumber,
          u.UserName AS UserUserName,
          u.Email AS UserEmail,
          u.Image AS UserImage,
          u.Country AS UserCountry,
          p.ProjectID,
          p.Name AS ProjectName,
          p.Description AS ProjectDescription,
          p.StartDate AS ProjectStartDate,
          p.EndDate AS ProjectEndDate,
          p.DateCreated AS ProjectDateCreated,
          s.StateID,
          s.Name AS StateName
        FROM 
            ProjectComment pc
        INNER JOIN 
            [User] u ON pc.UserID = u.UserID
        INNER JOIN 
            Project p ON pc.ProjectID = p.ProjectID
        INNER JOIN 
            State s ON p.StateID = s.StateID
        WHERE pc.ProjectCommentID = @ProjectCommentID;
      `)

    return ProjectCommentFormat(result.recordset)
  }

  static async getByProjectId ({ id }) {
    const result = await pool.request().input('ProjectID', sql.Int, id).query(`
        SELECT 
          pc.ProjectCommentID,
          pc.Description AS CommentDescription,
          pc.UserID AS CommentUserID,
          pc.ProjectID AS CommentProjectID,
          u.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName,
          u.Age AS UserAge,
          u.PhoneNumber AS UserPhoneNumber,
          u.UserName AS UserUserName,
          u.Email AS UserEmail,
          u.Image AS UserImage,
          u.Country AS UserCountry,
          p.ProjectID,
          p.Name AS ProjectName,
          p.Description AS ProjectDescription,
          p.StartDate AS ProjectStartDate,
          p.EndDate AS ProjectEndDate,
          p.DateCreated AS ProjectDateCreated,
          s.StateID,
          s.Name AS StateName
        FROM 
            ProjectComment pc
        INNER JOIN 
            [User] u ON pc.UserID = u.UserID
        INNER JOIN 
            Project p ON pc.ProjectID = p.ProjectID
        INNER JOIN 
            State s ON p.StateID = s.StateID
        WHERE p.ProjectID = @ProjectID;
      `)

    return ProjectCommentFormat(result.recordset)
  }

  static async getByUserId ({ id }) {
    const result = await pool
      .request()
      .input('UserID', sql.UniqueIdentifier, id).query(`
        SELECT 
          pc.ProjectCommentID,
          pc.Description AS CommentDescription,
          pc.UserID AS CommentUserID,
          pc.ProjectID AS CommentProjectID,
          u.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName,
          u.Age AS UserAge,
          u.PhoneNumber AS UserPhoneNumber,
          u.UserName AS UserUserName,
          u.Email AS UserEmail,
          u.Image AS UserImage,
          u.Country AS UserCountry,
          p.ProjectID,
          p.Name AS ProjectName,
          p.Description AS ProjectDescription,
          p.StartDate AS ProjectStartDate,
          p.EndDate AS ProjectEndDate,
          p.DateCreated AS ProjectDateCreated,
          s.StateID,
          s.Name AS StateName
        FROM 
            ProjectComment pc
        INNER JOIN 
            [User] u ON pc.UserID = u.UserID
        INNER JOIN 
            Project p ON pc.ProjectID = p.ProjectID
        INNER JOIN 
            State s ON p.StateID = s.StateID
        WHERE u.UserID = @UserID;
      `)

    return ProjectCommentFormat(result.recordset)
  }

  static async create ({ input }) {
    const { UserID, ProjectID, Description } = input

    const result = await pool
      .request()
      .input('UserID', sql.UniqueIdentifier, UserID)
      .input('ProjectID', sql.Int, ProjectID)
      .input('Description', sql.VarChar, Description).query(`
        INSERT INTO [ProjectComment] (UserID, ProjectID, Description) 
        VALUES (@UserID, @ProjectID, @Description);
      `)

    return result
  }

  static async delete ({ id }) {
    const result = await pool
      .request()
      .input('ProjectCommentID', sql.Int, id)
      .query(
        'DELETE FROM [ProjectComment] WHERE ProjectCommentID = @ProjectCommentID;'
      )

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true
    }

    return false
  }
}
