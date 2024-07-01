import { StateSchema } from "../schemas/state.schemas.js";

export class StateController {
  constructor({ stateModel }) {
    this.stateModel = stateModel;
  }

  getAll = async (req, res) => {
    try {
      const result = await this.stateModel.getAll();
      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getAll States:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getById = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.stateModel.getById({ id });

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "State Not Found",
        });
      }

      res.json(result.recordset[0]);
    } catch (error) {
      console.error("Error in getById State:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  create = async (req, res) => {
    const input = req.body;
    try {
      const validate = StateSchema.validate(input);

      if (!validate.success) {
        // 422 Unprocessable Entity
        return res
          .status(400)
          .json({ error: JSON.parse(validate.error.message) });
      }

      const result = await this.stateModel.create({ input });

      if (result.rowsAffected && result.rowsAffected[0] > 0) {
        res.json({ message: "State Created Successfully", state: req.body });
      } else { 
        console.error("Failed to create state");
        res.status(500).json({ message: "Failed to create state" });
      }
    } catch (error) {
      console.error("Error in create State:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const input = req.body;
    try {
      const result = await this.stateModel.update({ id, input });

      if (result.rowsAffected && result.rowsAffected[0] > 0) {
        res.json({ message: "State Updated Successfully", state: input });
      } else { 
        console.error("Failed to update state");
        res.status(500).json({ message: "Failed to update state" });
      }
    } catch (error) {
      console.error("Error in update State:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.stateModel.delete({ id });

      if (result === false) {
        return res.status(404).json({ message: "State not found" });
      }

      res.json({ message: "State Deleted Successfully" });
    } catch (error) {
      console.error("Error in delete State:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
