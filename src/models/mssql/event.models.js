import { getConnection } from "../../database/mssql/connection.js";
import sql from "mssql";

const pool = await getConnection();

export class EventModel {
  static async getAll() {
    console.log("Get All Users");

    const result = await pool.request().query("SELECT * FROM [Event];");

    return result;
  }

  static async getById({ id }) {
    console.log("Get Event By Id");

    const result = await pool
      .request()
      .input("EventID", sql.Int, id)
      .query("SELECT * FROM [Event] WHERE EventID = @EventID;");

    if (result.recordset.length === 0) return null;

    return result;
  }

  static async create({ input }) {
    console.log("Create Event");

    const { StartDate, EndDate, Description, UserID, IssueID } = input;

    const result = await pool
      .request()
      .input("StartDate", sql.DateTime, StartDate)
      .input("EndDate", sql.DateTime, EndDate)
      .input("Description", sql.VarChar, Description)
      .input("UserID", sql.UniqueIdentifier, UserID)
      .input("IssueID", sql.Int, IssueID).query(`
        INSERT INTO [Event] (StartDate, EndDate, Description, UserID, IssueID) 
        VALUES (@StartDate, @EndDate, @Description, @UserID, @IssueID);
      `);

    return result;
  }

  static async update({ id, input }) {
    console.log("Update Event");

    const { StartDate, EndDate, Description, UserID, IssueID } = input;

    const result = await pool
      .request()
      .input("EventID", sql.Int, id)
      .input("StartDate", sql.DateTime, StartDate)
      .input("EndDate", sql.DateTime, EndDate)
      .input("Description", sql.VarChar, Description)
      .input("UserID", sql.UniqueIdentifier, UserID)
      .input("IssueID", sql.Int, IssueID).query(`
        UPDATE [Event] SET 
        StartDate = @StartDate,
        EndDate = @EndDate,
        Description = @Description,
        UserID = @UserID,
        IssueID = @IssueID
        WHERE EventID = @EventID;
      `);

    return result;
  }

  static async delete({ id }) {
    console.log("Delete Event");

    const result = await pool
      .request()
      .input("EventID", sql.Int, id)
      .query("DELETE FROM [Event] WHERE EventID = @EventID;");

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true;
    }
    return false;
  }
}
