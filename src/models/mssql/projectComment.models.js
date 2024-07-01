import { getConnection } from "../../database/mssql/connection.js";
import sql from "mssql";

const pool = await getConnection();

export class ProjectCommentModel {
  static async getAll() {
    console.log("Get All Project Comments");

    const result = await pool
      .request()
      .query("SELECT * FROM [ProjectComment];");

    return result;
  }

  static async getById({ id }) {
    console.log("Get Project Comments By ID");

    const result = await pool
      .request()
      .input("ProjectCommentID", sql.Int, id)
      .query(
        "SELECT * FROM [ProjectComment] WHERE ProjectCommentID = @ProjectCommentID;"
      );

    return result;
  }

  static async getByProjectId({ id }) {
    console.log("Get Project Comments By Project ID");

    const result = await pool
      .request()
      .input("ProjectID", sql.Int, id)
      .query("SELECT * FROM [ProjectComment] WHERE ProjectID = @ProjectID;");

    return result;
  }

  static async getByUserId({ id }) {
    console.log("Get Project Comments By User ID");

    const result = await pool
      .request()
      .input("UserID", sql.UniqueIdentifier, id)
      .query("SELECT * FROM [ProjectComment] WHERE UserID = @UserID;");

    return result;
  }

  static async create({ input }) {
    console.log("Create Project Comment");

    const { UserID, ProjectID, Description } = input;

    const result = await pool
      .request()
      .input("UserID", sql.UniqueIdentifier, UserID)
      .input("ProjectID", sql.Int, ProjectID)
      .input("Description", sql.VarChar, Description).query(`
        INSERT INTO [ProjectComment] (UserID, ProjectID, Description) 
        VALUES (@UserID, @ProjectID, @Description);
      `);

    return result;
  }

  static async delete({ id }) {
    console.log("Delete Project Comment");

    const result = await pool
      .request()
      .input("ProjectCommentID", sql.Int, id)
      .query(
        "DELETE FROM [ProjectComment] WHERE ProjectCommentID = @ProjectCommentID;"
      );

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true;
    }
    return false;
  }
}
