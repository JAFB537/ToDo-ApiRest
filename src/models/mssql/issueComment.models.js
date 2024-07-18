import { getConnection } from '../../database/mssql/connection.js'
import sql from 'mssql'

import { IssueCommentFormat } from '../../utils/formats.js'

const pool = await getConnection()

export class IssueCommentModel {
  static async getAll () {
    const result = await pool.request().query(`
      SELECT 
        ic.IssueCommentID,
        ic.Description AS CommentDescription,
        ic.UserID AS CommentUserID,
        ic.IssueID AS CommentIssueID,
        u.UserID,
        u.Name AS UserName,
        u.LastName AS UserLastName,
        u.Age AS UserAge,
        u.PhoneNumber AS UserPhoneNumber,
        u.UserName AS UserUserName,
        u.Email AS UserEmail,
        u.Image AS UserImage,
        u.Country AS UserCountry,
        i.IssueID,
        i.Name AS IssueName,
        i.Description AS IssueDescription,
        FORMAT(i.DateCreated, 'dd/MM/yyyy HH:mm:ss') AS IssueDateCreated,
        s.StateID,
        s.Name AS StateName,
        ti.TypeIssueID,
        ti.Name AS TypeIssueName,
        p.ProjectID,
        p.Name AS ProjectName,
        p.Description AS ProjectDescription,
        FORMAT(p.StartDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectStartDate,
        FORMAT(p.EndDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectEndDate,
        FORMAT(p.DateCreated, 'dd/MM/yyyy HH:mm:ss') AS ProjectDateCreated
      FROM 
          IssueComment ic
      INNER JOIN 
          [User] u ON ic.UserID = u.UserID
      INNER JOIN 
          Issue i ON ic.IssueID = i.IssueID
      INNER JOIN 
          State s ON i.StateID = s.StateID
      INNER JOIN 
          TypeIssue ti ON i.TypeIssueID = ti.TypeIssueID
      INNER JOIN 
          Project p ON i.ProjectID = p.ProjectID;
    `)

    return IssueCommentFormat(result.recordset)
  }

  static async getById ({ id }) {
    const result = await pool.request().input('IssueCommentID', sql.Int, id)
      .query(`
        SELECT 
          ic.IssueCommentID,
          ic.Description AS CommentDescription,
          ic.UserID AS CommentUserID,
          ic.IssueID AS CommentIssueID,
          u.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName,
          u.Age AS UserAge,
          u.PhoneNumber AS UserPhoneNumber,
          u.UserName AS UserUserName,
          u.Email AS UserEmail,
          u.Image AS UserImage,
          u.Country AS UserCountry,
          i.IssueID,
          i.Name AS IssueName,
          i.Description AS IssueDescription,
          FORMAT(i.DateCreated, 'dd/MM/yyyy HH:mm:ss') AS IssueDateCreated,
          s.StateID,
          s.Name AS StateName,
          ti.TypeIssueID,
          ti.Name AS TypeIssueName,
          p.ProjectID,
          p.Name AS ProjectName,
          p.Description AS ProjectDescription,
          FORMAT(p.StartDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectStartDate,
          FORMAT(p.EndDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectEndDate,
          FORMAT(p.DateCreated, 'dd/MM/yyyy HH:mm:ss') AS ProjectDateCreated
        FROM 
            IssueComment ic
        INNER JOIN 
            [User] u ON ic.UserID = u.UserID
        INNER JOIN 
            Issue i ON ic.IssueID = i.IssueID
        INNER JOIN 
            State s ON i.StateID = s.StateID
        INNER JOIN 
            TypeIssue ti ON i.TypeIssueID = ti.TypeIssueID
        INNER JOIN 
            Project p ON i.ProjectID = p.ProjectID
        WHERE ic.IssueCommentID = @IssueCommentID;
      `)

    return IssueCommentFormat(result.recordset)
  }

  static async getByUserId ({ id }) {
    const result = await pool
      .request()
      .input('UserID', sql.UniqueIdentifier, id).query(`
        SELECT 
          ic.IssueCommentID,
          ic.Description AS CommentDescription,
          ic.UserID AS CommentUserID,
          ic.IssueID AS CommentIssueID,
          u.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName,
          u.Age AS UserAge,
          u.PhoneNumber AS UserPhoneNumber,
          u.UserName AS UserUserName,
          u.Email AS UserEmail,
          u.Image AS UserImage,
          u.Country AS UserCountry,
          i.IssueID,
          i.Name AS IssueName,
          i.Description AS IssueDescription,
          FORMAT(i.DateCreated, 'dd/MM/yyyy HH:mm:ss') AS IssueDateCreated,
          s.StateID,
          s.Name AS StateName,
          ti.TypeIssueID,
          ti.Name AS TypeIssueName,
          p.ProjectID,
          p.Name AS ProjectName,
          p.Description AS ProjectDescription,
          FORMAT(p.StartDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectStartDate,
          FORMAT(p.EndDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectEndDate,
          FORMAT(p.DateCreated, 'dd/MM/yyyy HH:mm:ss') AS ProjectDateCreated
        FROM 
            IssueComment ic
        INNER JOIN 
            [User] u ON ic.UserID = u.UserID
        INNER JOIN 
            Issue i ON ic.IssueID = i.IssueID
        INNER JOIN 
            State s ON i.StateID = s.StateID
        INNER JOIN 
            TypeIssue ti ON i.TypeIssueID = ti.TypeIssueID
        INNER JOIN 
            Project p ON i.ProjectID = p.ProjectID
        WHERE u.UserID = @UserID;
      `)

    return IssueCommentFormat(result.recordset)
  }

  static async getByIssueId ({ id }) {
    const result = await pool.request().input('IssueID', sql.Int, id).query(`
        SELECT 
          ic.IssueCommentID,
          ic.Description AS CommentDescription,
          ic.UserID AS CommentUserID,
          ic.IssueID AS CommentIssueID,
          u.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName,
          u.Age AS UserAge,
          u.PhoneNumber AS UserPhoneNumber,
          u.UserName AS UserUserName,
          u.Email AS UserEmail,
          u.Image AS UserImage,
          u.Country AS UserCountry,
          i.IssueID,
          i.Name AS IssueName,
          i.Description AS IssueDescription,
          FORMAT(i.DateCreated, 'dd/MM/yyyy HH:mm:ss') AS IssueDateCreated,
          s.StateID,
          s.Name AS StateName,
          ti.TypeIssueID,
          ti.Name AS TypeIssueName,
          p.ProjectID,
          p.Name AS ProjectName,
          p.Description AS ProjectDescription,
          FORMAT(p.StartDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectStartDate,
          FORMAT(p.EndDate, 'dd/MM/yyyy HH:mm:ss') AS ProjectEndDate,
          FORMAT(p.DateCreated, 'dd/MM/yyyy HH:mm:ss') AS ProjectDateCreated
        FROM 
            IssueComment ic
        INNER JOIN 
            [User] u ON ic.UserID = u.UserID
        INNER JOIN 
            Issue i ON ic.IssueID = i.IssueID
        INNER JOIN 
            State s ON i.StateID = s.StateID
        INNER JOIN 
            TypeIssue ti ON i.TypeIssueID = ti.TypeIssueID
        INNER JOIN 
            Project p ON i.ProjectID = p.ProjectID
        WHERE i.IssueID = @IssueID;
      `)

    return IssueCommentFormat(result.recordset)
  }

  static async create ({ input }) {
    const { UserID, IssueID, Description } = input

    const result = await pool
      .request()
      .input('UserID', sql.UniqueIdentifier, UserID)
      .input('IssueID', sql.Int, IssueID)
      .input('Description', sql.VarChar, Description).query(`
        INSERT INTO [IssueComment] (UserID, IssueID, Description) 
        VALUES (@UserID, @IssueID, @Description);
      `)

    return result
  }

  static async delete ({ id }) {
    const result = await pool
      .request()
      .input('IssueCommentID', sql.Int, id)
      .query(
        'DELETE FROM [IssueComment] WHERE IssueCommentID = @IssueCommentID;'
      )

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true
    }

    return false
  }
}
