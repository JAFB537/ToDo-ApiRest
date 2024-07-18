import { getConnection } from '../../database/mssql/connection.js'
import { IssueFormat } from '../../utils/formats.js'
import sql from 'mssql'

const pool = await getConnection()

export class IssueModel {
  static async getAll () {
    const result = await pool.request().query(`
      SELECT 
        i.IssueID,
        i.Name AS IssueName,
        i.Description AS IssueDescription,
        FORMAT(i.DateCreated, 'dd/MM/yyyy HH:mm:ss')  AS IssueDateCreated,
        s.StateID,
        s.Name AS StateName,
        ti.TypeIssueID,
        ti.Name AS TypeIssueName,
        p.ProjectID,
        p.Name AS ProjectName,
        u.UserID,
        u.Name AS UserName,
        u.LastName AS UserLastName
      FROM 
          Issue i
      INNER JOIN 
          State s ON i.StateID = s.StateID
      INNER JOIN 
          TypeIssue ti ON i.TypeIssueID = ti.TypeIssueID
      INNER JOIN 
          Project p ON i.ProjectID = p.ProjectID
      INNER JOIN 
          [User] u ON i.UserID = u.UserID;
    `)

    return IssueFormat(result.recordset)
  }

  static async getById ({ id }) {
    const result = await pool.request().input('IssueID', sql.Int, id).query(`
        SELECT 
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
          u.UserID,
          u.Name AS UserName,
          u.LastName AS UserLastName
        FROM 
            Issue i
        INNER JOIN 
            State s ON i.StateID = s.StateID
        INNER JOIN 
            TypeIssue ti ON i.TypeIssueID = ti.TypeIssueID
        INNER JOIN 
            Project p ON i.ProjectID = p.ProjectID
        INNER JOIN 
            [User] u ON i.UserID = u.UserID
        WHERE i.IssueID = @IssueID;
      `)

    if (result.recordset.length === 0) return null

    return IssueFormat(result.recordset)
  }

  static async create ({ input }) {
    const { Name, Description, StateID, TypeIssueID, UserID, ProjectID } =
      input

    const result = await pool
      .request()
      .input('Name', sql.VarChar, Name)
      .input('Description', sql.VarChar, Description)
      .input('StateID', sql.Int, StateID)
      .input('TypeIssueID', sql.Int, TypeIssueID)
      .input('UserID', sql.UniqueIdentifier, UserID)
      .input('ProjectID', sql.Int, ProjectID).query(`
        INSERT INTO [Issue] (Name, Description, StateID, TypeIssueID, UserID, ProjectID, DateCreated) 
        VALUES (@Name, @Description, @StateID, @TypeIssueID, @UserID, @ProjectID, GETDATE());
      `)

    return result
  }

  static async update ({ id, input }) {
    const { Name, Description, StateID, TypeIssueID, UserID, ProjectID } =
      input

    const result = await pool
      .request()
      .input('IssueID', sql.Int, id)
      .input('Name', sql.VarChar, Name)
      .input('Description', sql.VarChar, Description)
      .input('StateID', sql.Int, StateID)
      .input('TypeIssueID', sql.Int, TypeIssueID)
      .input('UserID', sql.UniqueIdentifier, UserID)
      .input('ProjectID', sql.Int, ProjectID).query(`
        UPDATE [Issue] SET 
        Name = @Name,
        Description = @Description,
        StateID = @StateID,
        TypeIssueID = @TypeIssueID,
        UserID = @UserID,
        ProjectID = @ProjectID
        WHERE IssueID = @IssueID;
      `)

    return result
  }

  static async delete ({ id }) {
    const result = await pool
      .request()
      .input('IssueID', sql.Int, id)
      .query('DELETE FROM [Issue] WHERE IssueID = @IssueID;')

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true
    }

    return false
  }
}
