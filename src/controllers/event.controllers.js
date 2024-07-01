import { EventModel } from "../models/mssql/event.models.js";

export class EventController {
  constructor({ eventModel }) {
    this.eventModel = eventModel;
  }

  getAll = async (req, res) => {
    try {
      const result = await this.eventModel.getAll();
      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getById = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.eventModel.getById({ id : id });

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Event Not Found",
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
      const result = await this.eventModel.create({ input : input });

      res.json({ message: "Event Created Successfully", event: req.body });
    } catch (error) {
      console.error("Error in create:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const input = req.body;
    try {
      const result = await this.eventModel.update({ id : id, input : input });

      res.json({ message: "Event Updated Successfully", event: input });
    } catch (error) {
      console.error("Error in update:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.eventModel.delete({ id : id });

      if (!result) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.json({ message: "Event Deleted Successfully" });
    } catch (error) {
      console.error("Error in delete:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
