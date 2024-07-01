import { UserProjectModel } from "../models/mssql/userProject.models.js";
import { UserSchema } from "../schemas/user.schemas.js";

export class UserProjectController {
  constructor({ userProjectModel }) {
    this.userProjectModel = userProjectModel;
  }

  getAll = async (req, res) => {
    try {
      const result = await this.userProjectModel.getAll();
      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getById = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.userProjectModel.getById({ id });

      res.json(result.recordset[0]);
    } catch (error) {
      console.error("Error in getId:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getByUserId = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.userProjectModel.getByUserId({ id });

      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getByUserId:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getByProjectId = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.userProjectModel.getByProjectId({ id });

      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getByProjectId:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  create = async (req, res) => {
    const input = req.body;
    try {
      const result = await this.userProjectModel.create({ input });

      res.json({
        message: "User-Project Created Successfully",
        userProject: req.body,
      });
    } catch (error) {
      console.error("Error in create:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.userProjectModel.delete({ id });

      if (!result) {
        return res
          .status(404)
          .json({ message: "User-Project not found" });
      }

      res.json({ message: "User-Project Deleted Successfully" });
    } catch (error) {
      console.error("Error in delete:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
