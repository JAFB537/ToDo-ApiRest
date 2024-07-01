import { getConnection } from "../../database/connection.js";
import sql from "mssql";

const pool = await getConnection();

export class TypeIssueModel {
  static async getAll() {
    console.log("Get All TypeIssues");

    const result = await pool.request().query("SELECT * FROM [TypeIssue];");

    return result;
  }

  static async getById({ id }) {
    console.log("Get TypeIssue By Id");

    const result = await pool
      .request()
      .input("TypeIssueID", sql.Int, id)
      .query("SELECT * FROM [TypeIssue] WHERE TypeIssueID = @TypeIssueID;");

    if (result.recordset.length === 0) return null;

    return result;
  }

  static async create({ input }) {
    console.log("Create TypeIssue");

    const { Name, Description, Image } = input;

    const result = await pool
      .request()
      .input("Name", sql.VarChar, Name)
      .input("Description", sql.VarChar, Description)
      .input("Image", sql.VarChar, Image)
      .query(
        "INSERT INTO [TypeIssue] (Name, Description, Image) VALUES (@Name, @Description, @Image);"
      );

    return result;
  }

  static async update({ id, input }) {
    console.log("Update TypeIssue");

    const { Name, Description, Image } = input;

    const result = await pool
      .request()
      .input("TypeIssueID", sql.Int, id)
      .input("Name", sql.VarChar, Name)
      .input("Description", sql.VarChar, Description)
      .input("Image", sql.VarChar, Image)
      .query(
        "UPDATE [TypeIssue] SET Name = @Name, Description = @Description, Image = @Image WHERE TypeIssueID = @TypeIssueID;"
      );

    return result;
  }

  static async delete({ id }) {
    console.log("Delete TypeIssue");

    const result = await pool
      .request()
      .input("TypeIssueID", sql.Int, id)
      .query("DELETE FROM [TypeIssue] WHERE TypeIssueID = @TypeIssueID;");

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true;
    }
    return false;
  }
}
