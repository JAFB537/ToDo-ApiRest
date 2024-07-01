import { getConnection } from "../../database/connection.js";
import sql from "mssql";

const pool = await getConnection();

export class UserProjectModel {
  static async getAll() {
    console.log("Get All User-Project Relationships");

    const result = await pool.request().query("SELECT * FROM [UserProject];");

    return result;
  }

  static async getById({ id }) {
    console.log("Get User-Project Relationships By ID");

    const result = await pool
      .request()
      .input("UserProjectID", sql.Int, id)
      .query("SELECT * FROM [UserProject] WHERE UserProjectID = @UserProjectID;");

    return result;
  }

  static async getByUserId({ id }) {
    console.log("Get User-Project Relationships By User ID");

    const result = await pool
      .request()
      .input("UserID", sql.UniqueIdentifier, id)
      .query("SELECT * FROM [UserProject] WHERE UserID = @UserID;");

    return result;
  }

  static async getByProjectId({ id }) {
    console.log("Get User-Project Relationships By Project ID");

    const result = await pool
      .request()
      .input("ProjectID", sql.Int, id)
      .query("SELECT * FROM [UserProject] WHERE ProjectID = @ProjectID;");

    return result;
  }

  static async create({ input }) {
    console.log("Create User-Project");

    const { UserID, ProjectID } = input

    const result = await pool
      .request()
      .input("UserID", sql.UniqueIdentifier, UserID)
      .input("ProjectID", sql.Int, ProjectID).query(`
        INSERT INTO [UserProject] (UserID, ProjectID) 
        VALUES (@UserID, @ProjectID);
      `);

    return result;
  }

  static async delete({ id }) {
    console.log("Delete User-Project");

    const result = await pool
      .request()
      .input("UserProjectID", sql.Int, id)
      .query(
        "DELETE FROM [UserProject] WHERE UserProjectID = @UserProjectID;"
      );

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true;
    }
    return false;
  }
}
