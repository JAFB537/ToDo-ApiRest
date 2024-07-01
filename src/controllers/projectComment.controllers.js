import { ProjectCommentModel } from "../models/mssql/projectComment.models.js";

export class ProjectCommentController {
  constructor({ projectCommentModel }) {
    this.projectCommentModel = projectCommentModel;
  }

  getAll = async (req, res) => {
    try {
      const result = await this.projectCommentModel.getAll();
      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getById = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.projectCommentModel.getById({
        id,
      });

      res.json(result.recordset[0]);
    } catch (error) {
      console.error("Error in getById:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getByProjectId = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.projectCommentModel.getByProjectId({ id });

      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getByProjectId:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getByUserId = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.projectCommentModel.getByUserId({ id });

      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getByUserId:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  create = async (req, res) => {
    const input = req.body;
    try {
      const result = await this.projectCommentModel.create({ input });

      res.json({
        message: "Project Comment Created Successfully",
        projectComment: req.body,
      });
    } catch (error) {
      console.error("Error in create:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.projectCommentModel.delete({ id });

      if (!result) {
        return res.status(404).json({ message: "Project Comment not found" });
      }

      res.json({ message: "Project Comment Deleted Successfully" });
    } catch (error) {
      console.error("Error in delete:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
