import { getConnection } from "../../database/mssql/connection.js";
import sql from "mssql";

const pool = await getConnection();

export class ProjectModel {
  static async getAll() {
    console.log("Get All Projects");

    const result = await pool.request().query("SELECT * FROM [Project];");

    return result;
  }

  static async getById({ id }) {
    console.log("Get Project By Id");

    const result = await pool
      .request()
      .input("ProjectID", sql.Int, id)
      .query("SELECT * FROM [Project] WHERE ProjectID = @ProjectID;");

    if (result.recordset.length === 0) return null;

    return result;
  }

  static async create({ input }) {
    console.log("Create Project");

    const { Name, Description, StartDate, EndDate, StateID, UserID } = input;

    const result = await pool
      .request()
      .input("Name", sql.VarChar, Name)
      .input("Description", sql.VarChar, Description)
      .input("StartDate", sql.Date, StartDate)
      .input("EndDate", sql.Date, EndDate)
      .input("StateID", sql.Int, StateID)
      .input("UserID", sql.UniqueIdentifier, UserID).query(`
        INSERT INTO [Project] (Name, Description, StartDate, EndDate, StateID, UserID, DateCreated) 
        VALUES (@Name, @Description, @StartDate, @EndDate, @StateID, @UserID, GETDATE());
      `);

    return result;
  }

  static async update({ id, input }) {
    console.log("Update Project");

    const { Name, Description, StartDate, EndDate, StateID, UserID } = input;

    const result = await pool
      .request()
      .input("ProjectID", sql.Int, id)
      .input("Name", sql.VarChar, Name)
      .input("Description", sql.VarChar, Description)
      .input("StartDate", sql.Date, StartDate)
      .input("EndDate", sql.Date, EndDate)
      .input("StateID", sql.Int, StateID)
      .input("UserID", sql.UniqueIdentifier, UserID).query(`
        UPDATE [Project] SET 
        Name = @Name,
        Description = @Description,
        StartDate = @StartDate,
        EndDate = @EndDate,
        StateID = @StateID,
        UserID = @UserID
        WHERE ProjectID = @ProjectID;
      `);

    return result;
  }

  static async delete({ id }) {
    console.log("Delete Project");

    const result = await pool
      .request()
      .input("ProjectID", sql.Int, id)
      .query("DELETE FROM [Project] WHERE ProjectID = @ProjectID;");

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true;
    }
    return false;
  }
}
