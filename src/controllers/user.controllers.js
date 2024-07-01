import { UserSchema } from "../schemas/user.schemas.js";

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    try {
      const result = await this.userModel.getAll();
      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getById = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.userModel.getById({ id });

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }

      res.json(result.recordset[0]);
    } catch (error) {
      console.error("Error in getById:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getLogin = async (req, res) => {
    const { UserName, Password } = req.body;

    try {
      const user = await this.userModel.getLogin({
        input: { UserName, Password },
      });

      res.json(user);
    } catch (error) {
      console.error("Error in getLogin:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  create = async (req, res) => {
    const input = req.body;
    try {
      const validate = UserSchema.validate(input);

      if (!validate.success) {
        // 422 Unprocessable Entity
        return res
          .status(400)
          .json({ error: JSON.parse(validate.error.message) });
      }

      const result = await this.userModel.create({ input });

      res.json({ message: "User Created Successfully", user: req.body });
    } catch (error) {
      console.error("Error in create:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const input = req.body;
    try {
      const result = await this.userModel.update({ id, input });

      res.json({ message: "User Updated Successfully", user: input });
    } catch (error) {
      console.error("Error in update:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.userModel.delete({ id });

      if (result === false) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User Deleted Successfully" });
    } catch (error) {
      console.error("Error in delete:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
