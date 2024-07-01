import { ProjectSchema } from "../schemas/project.schemas.js";

export class ProjectController {
  constructor({ projectModel }) {
    this.projectModel = projectModel;
  }

  getAll = async (req, res) => {
    try {
      const result = await this.projectModel.getAll();
      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getAll Projects:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getById = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.projectModel.getById({ id });

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Project Not Found",
        });
      }

      res.json(result.recordset[0]);
    } catch (error) {
      console.error("Error in getById Project:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  create = async (req, res) => {
    const input = req.body;
    try {
      const validate = ProjectSchema.validate(input);

      if (!validate.success) {
        // 422 Unprocessable Entity
        return res
          .status(400)
          .json({ error: JSON.parse(validate.error.message) });
      }

      const result = await this.projectModel.create({ input });

      res.json({ message: "Project Created Successfully", project: req.body });
    } catch (error) {
      console.error("Error in create Project:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const input = req.body;
    try {
      const validate = ProjectSchema.validatePartial(input);

      if (!validate.success) {
        // 422 Unprocessable Entity
        return res
          .status(400)
          .json({ error: JSON.parse(validate.error.message) });
      }
      const result = await this.projectModel.update({ id: id, input: input });

      if (result.rowsAffected && result.rowsAffected[1] >= 1) {
        res.json({ message: "Project Updated Successfully", project: input });
      } else {
        console.error("Failed to update project");
        res.status(500).json({ message: "Failed to update project" });
      }
    } catch (error) {
      console.error("Error in update Project:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.projectModel.delete({ id });

      if (result === false) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json({ message: "Project Deleted Successfully" });
    } catch (error) {
      console.error("Error in delete Project:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
