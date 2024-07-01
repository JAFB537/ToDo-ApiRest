import { getConnection } from "../../database/mssql/connection.js";
import sql from "mssql";

const pool = await getConnection();

export class IssueModel {
  static async getAll() {
    console.log("Get All Issues");

    const result = await pool.request().query("SELECT * FROM [Issue];");

    return result;
  }

  static async getById({ id }) {
    console.log("Get Issue By Id");

    const result = await pool
      .request()
      .input("IssueID", sql.Int, id)
      .query("SELECT * FROM [Issue] WHERE IssueID = @IssueID;");

    if (result.recordset.length === 0) return null;

    return result;
  }

  static async create({ input }) {
    console.log("Create Issue");

    const { Name, Description, StateID, TypeIssueID, UserID, ProjectID } =
      input;

    const result = await pool
      .request()
      .input("Name", sql.VarChar, Name)
      .input("Description", sql.VarChar, Description)
      .input("StateID", sql.Int, StateID)
      .input("TypeIssueID", sql.Int, TypeIssueID)
      .input("UserID", sql.UniqueIdentifier, UserID)
      .input("ProjectID", sql.Int, ProjectID).query(`
        INSERT INTO [Issue] (Name, Description, StateID, TypeIssueID, UserID, ProjectID) 
        VALUES (@Name, @Description, @StateID, @TypeIssueID, @UserID, @ProjectID);
      `);

    return result;
  }

  static async update({ id, input }) {
    console.log("Update Issue");

    const { Name, Description, StateID, TypeIssueID, UserID, ProjectID } =
      input;

    const result = await pool
      .request()
      .input("IssueID", sql.Int, id)
      .input("Name", sql.VarChar, Name)
      .input("Description", sql.VarChar, Description)
      .input("StateID", sql.Int, StateID)
      .input("TypeIssueID", sql.Int, TypeIssueID)
      .input("UserID", sql.UniqueIdentifier, UserID)
      .input("ProjectID", sql.Int, ProjectID).query(`
        UPDATE [Issue] SET 
        Name = @Name,
        Description = @Description,
        StateID = @StateID,
        TypeIssueID = @TypeIssueID,
        UserID = @UserID,
        ProjectID = @ProjectID
        WHERE IssueID = @IssueID;
      `);

    return result;
  }

  static async delete({ id }) {
    console.log("Delete Issue");

    const result = await pool
      .request()
      .input("IssueID", sql.Int, id)
      .query("DELETE FROM [Issue] WHERE IssueID = @IssueID;");

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true;
    }
    return false;
  }
}
