import { IssueModel } from "../models/mssql/issue.models.js";

export class IssueController {
  constructor({ issueModel }) {
    this.issueModel = issueModel;
  }

  getAll = async (req, res) => {
    try {
      const result = await this.issueModel.getAll();
      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getById = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.issueModel.getById({ id });

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Issue Not Found",
        });
      }

      res.json(result.recordset[0]);
    } catch (error) {
      console.error("Error in getById:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  create = async (req, res) => {
    const input = req.body;
    try {
      const result = await this.issueModel.create({ input });

      res.json({ message: "Issue Created Successfully", issue: req.body });
    } catch (error) {
      console.error("Error in create:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const input = req.body;
    try {
      const result = await this.issueModel.update({ id, input });

      res.json({ message: "Issue Updated Successfully", issue: input });
    } catch (error) {
      console.error("Error in update:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.issueModel.delete({ id });

      if (!result) {
        return res.status(404).json({ message: "Issue not found" });
      }

      res.json({ message: "Issue Deleted Successfully" });
    } catch (error) {
      console.error("Error in delete:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
