import { getConnection } from "../../database/mssql/connection.js";
import sql from "mssql";

const pool = await getConnection();

export class IssueCommentModel {
  static async getAll() {
    console.log("Get All Issue Comments");

    const result = await pool.request().query("SELECT * FROM [IssueComment];");

    return result;
  }

  static async getById({ id }) {
    console.log("Get Issue Comments By ID");

    const result = await pool
      .request()
      .input("IssueCommentID", sql.Int, id)
      .query("SELECT * FROM [IssueComment] WHERE IssueCommentID = @IssueCommentID;");

    return result;
  }

  static async getByIssueId({ id }) {
    console.log("Get Issue Comments By Issue ID");

    const result = await pool
      .request()
      .input("IssueID", sql.Int, id)
      .query("SELECT * FROM [IssueComment] WHERE IssueID = @IssueID;");

    return result;
  }

  static async getByUserId({ id }) {
    console.log("Get Issue Comments By User ID");

    const result = await pool
      .request()
      .input("UserID", sql.UniqueIdentifier, id)
      .query("SELECT * FROM [IssueComment] WHERE UserID = @UserID;");

    return result;
  }

  static async create({ input }) {
    console.log("Create Issue Comment");

    const { UserID, IssueID, Description } = input

    const result = await pool
      .request()
      .input("UserID", sql.UniqueIdentifier, UserID)
      .input("IssueID", sql.Int, IssueID)
      .input("Description", sql.VarChar, Description).query(`
        INSERT INTO [IssueComment] (UserID, IssueID, Description) 
        VALUES (@UserID, @IssueID, @Description);
      `);

    return result;
  }

  static async delete({ id }) {
    console.log("Delete Issue Comment");

    const result = await pool
      .request()
      .input("IssueCommentID", sql.Int, id)
      .query(
        "DELETE FROM [IssueComment] WHERE IssueCommentID = @IssueCommentID;"
      );

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true;
    }
    return false;
  }
}
