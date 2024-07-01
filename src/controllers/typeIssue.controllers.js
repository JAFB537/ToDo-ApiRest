import { TypeIssueModel } from "../models/mssql/typeIssue.models.js";

export class TypeIssueController {
  constructor({ typeIssueModel }) {
    this.typeIssueModel = typeIssueModel;
  }

  getAll = async (req, res) => {
    try {
      const result = await this.typeIssueModel.getAll();
      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getById = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.typeIssueModel.getById({ id });

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Type Issue Not Found",
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
      const result = await this.typeIssueModel.create({ input });

      res.json({
        message: "Type Issue Created Successfully",
        typeIssue: req.body,
      });
    } catch (error) {
      console.error("Error in create:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const input = req.body;
    try {
      const result = await this.typeIssueModel.update({ id, input });

      res.json({
        message: "Type Issue Updated Successfully",
        typeIssue: input,
      });
    } catch (error) {
      console.error("Error in update:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.typeIssueModel.delete({ id });

      if (!result) {
        return res.status(404).json({ message: "Type Issue not found" });
      }

      res.json({ message: "Type Issue Deleted Successfully" });
    } catch (error) {
      console.error("Error in delete:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
