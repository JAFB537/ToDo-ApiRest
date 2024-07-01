import { getConnection } from "../../database/connection.js";
import sql from "mssql";

const pool = await getConnection();

export class StateModel {
  static async getAll() {
    console.log("Get All States");

    const result = await pool.request().query("SELECT * FROM [State];");

    return result;
  }

  static async getById({ id }) {
    console.log("Get State By Id");

    const result = await pool
      .request()
      .input("StateID", sql.Int, id)
      .query("SELECT * FROM [State] WHERE StateID = @StateID;");

    if (result.recordset.length === 0) return null;

    return result;
  }

  static async create({ input }) {
    console.log("Create State");

    const { Name } = input;

    const result = await pool
      .request()
      .input("Name", sql.VarChar, Name)
      .query("INSERT INTO [State] (Name) VALUES (@Name);");

    return result;
  }

  static async update({ id, input }) {
    console.log("Update State");

    const { Name } = input;

    const result = await pool
      .request()
      .input("StateID", sql.Int, id)
      .input("Name", sql.VarChar, Name)
      .query("UPDATE [State] SET Name = @Name WHERE StateID = @StateID;");

    return result;
  }

  static async delete({ id }) {
    console.log("Delete State");

    const result = await pool
      .request()
      .input("StateID", sql.Int, id)
      .query("DELETE FROM [State] WHERE StateID = @StateID;");

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true;
    }
    return false;
  }
}
