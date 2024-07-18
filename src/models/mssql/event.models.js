import { getConnection } from '../../database/mssql/connection.js'
import { EventFormat } from '../../utils/formats.js'
import sql from 'mssql'

const pool = await getConnection()

export class EventModel {
  static async getAll () {
    const result = await pool.request().query(`
      SELECT 
        e.EventID, 
        FORMAT(e.StartDate, 'dd/MM/yyyy HH:mm:ss') AS StartDate, 
        FORMAT(e.EndDate, 'dd/MM/yyyy HH:mm:ss') AS EndDate, 
        e.Description as EventDescription, 
        e.UserID as EventUserID, 
        e.IssueID,
        u.Name as UserName,
        u.LastName as UserLastName,
        u.Age as UserAge,
        u.PhoneNumber as UserPhoneNumber,
        u.UserName as UserUserName,
        u.Email as UserEmail,
        u.Image as UserImage,
        u.Country as UserCountry,
        i.Name as IssueName,
        i.Description as IssueDescription,
        i.DateCreated as IssueDateCreated,
        i.StateID as IssueStateID,
        i.TypeIssueID as IssueTypeIssueID,
        i.ProjectID as IssueProjectID
      FROM [Event] e
      LEFT JOIN [User] u ON e.UserID = u.UserID
      LEFT JOIN [Issue] i ON e.IssueID = i.IssueID;
    `)

    return EventFormat(result.recordset)
  }

  static async getById ({ id }) {
    const result = await pool.request().input('EventID', sql.Int, id)
      .query(`      SELECT 
        e.EventID, 
        e.StartDate, 
        e.EndDate, 
        e.Description as EventDescription, 
        e.UserID as EventUserID, 
        e.IssueID,
        u.Name as UserName,
        u.LastName as UserLastName,
        u.Age as UserAge,
        u.PhoneNumber as UserPhoneNumber,
        u.UserName as UserUserName,
        u.Email as UserEmail,
        u.Image as UserImage,
        u.Country as UserCountry,
        i.Name as IssueName,
        i.Description as IssueDescription,
        i.DateCreated as IssueDateCreated,
        i.StateID as IssueStateID,
        i.TypeIssueID as IssueTypeIssueID,
        i.ProjectID as IssueProjectID
      FROM [Event] e
      LEFT JOIN [User] u ON e.UserID = u.UserID
      LEFT JOIN [Issue] i ON e.IssueID = i.IssueID WHERE EventID = @EventID;`)

    if (result.recordset.length === 0) return null

    return EventFormat(result.recordset)
  }

  static async create ({ input }) {
    const { StartDate, EndDate, Description, UserID, IssueID } = input

    const result = await pool
      .request()
      .input('StartDate', sql.DateTime, StartDate)
      .input('EndDate', sql.DateTime, EndDate)
      .input('Description', sql.VarChar, Description)
      .input('UserID', sql.UniqueIdentifier, UserID)
      .input('IssueID', sql.Int, IssueID).query(`
        INSERT INTO [Event] (StartDate, EndDate, Description, UserID, IssueID) 
        VALUES (@StartDate, @EndDate, @Description, @UserID, @IssueID);
      `)

    return result
  }

  static async update ({ id, input }) {
    const { StartDate, EndDate, Description, UserID, IssueID } = input

    const result = await pool
      .request()
      .input('EventID', sql.Int, id)
      .input('StartDate', sql.DateTime, StartDate)
      .input('EndDate', sql.DateTime, EndDate)
      .input('Description', sql.VarChar, Description)
      .input('UserID', sql.UniqueIdentifier, UserID)
      .input('IssueID', sql.Int, IssueID).query(`
        UPDATE [Event] SET 
        StartDate = @StartDate,
        EndDate = @EndDate,
        Description = @Description,
        UserID = @UserID,
        IssueID = @IssueID
        WHERE EventID = @EventID;
      `)

    return result
  }

  static async delete ({ id }) {
    const result = await pool
      .request()
      .input('EventID', sql.Int, id)
      .query('DELETE FROM [Event] WHERE EventID = @EventID;')

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true
    }

    return false
  }
}
