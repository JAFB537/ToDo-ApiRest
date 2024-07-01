import { getConnection } from "../../database/mssql/connection.js";

import sql from "mssql";

const pool = await getConnection();

export class UserModel {
  static async getAll() {
    console.log("Get All Users");

    const result = await pool.request().query("SELECT * FROM [User];");

    return result;
  }

  static async getById({ id }) {
    console.log("Get User By Id");

    const result = await pool
      .request()
      .input("UserID", sql.UniqueIdentifier, id)
      .query("SELECT * FROM [User] WHERE UserID = @UserID;");

    if (result.length === 0) return null;

    return result;
  }

  static async getLogin({ input }) {
    console.log("Login User");

    const { UserName, Password } = input;

    const result = await pool
      .request()
      .input("UserName", sql.VarChar, UserName)
      .input("Password", sql.VarChar, Password)
      .query(
        "SELECT * FROM [User] WHERE UserName = @UserName AND Password = @Password"
      );

    return result.recordset[0];
  }

  static async create({ input }) {
    console.log("Create User");

    const {
      Name,
      LastName,
      Age,
      PhoneNumber,
      UserName,
      Password,
      Email,
      Image,
      Country,
    } = input;

    const result = await pool
      .request()
      .input("Name", sql.VarChar, Name)
      .input("LastName", sql.VarChar, LastName)
      .input("Age", sql.Int, Age)
      .input("PhoneNumber", sql.VarChar, PhoneNumber)
      .input("UserName", sql.VarChar, UserName)
      .input("Password", sql.VarChar, Password)
      .input("Email", sql.VarChar, Email)
      .input("Image", sql.VarChar, Image)
      .input("Country", sql.VarChar, Country).query(`
          INSERT INTO [User] (Name, LastName, Age, PhoneNumber, UserName, Password, Email, Image, Country) 
          VALUES (@Name, @LastName, @Age, @PhoneNumber, @UserName, @Password, @Email, @Image, @Country);
      `);
    return result;
  }

  static async update({ id, input }) {
    console.log("Update User");

    const {
      Name,
      LastName,
      Age,
      PhoneNumber,
      UserName,
      Password,
      Email,
      Image,
      Country,
    } = input;

    const result = await pool
      .request()
      .input("UserID", sql.UniqueIdentifier, id)
      .input("Name", sql.VarChar, Name)
      .input("LastName", sql.VarChar, LastName)
      .input("Age", sql.Int, Age)
      .input("PhoneNumber", sql.VarChar, PhoneNumber)
      .input("UserName", sql.VarChar, UserName)
      .input("Password", sql.VarChar, Password)
      .input("Email", sql.VarChar, Email)
      .input("Image", sql.VarChar, Image)
      .input("Country", sql.VarChar, Country).query(`
      UPDATE [User] SET 
      Name = @Name,
      LastName = @LastName,
      Age = @Age,
      PhoneNumber = @PhoneNumber,
      UserName = @UserName,
      Password = @Password,
      Email = @Email,
      Image = @Image,
      Country = @Country
      WHERE UserID = @UserID;
    `);
    return result;
  }

  static async delete({ id }) {
    console.log("Delete User");

    const result = await pool
      .request()
      .input("UserID", sql.UniqueIdentifier, id)
      .query("DELETE FROM [User] WHERE UserID = @UserID;");

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return true;
    }
    return false;
  }
}
