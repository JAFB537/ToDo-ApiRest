export class IssueCommentController {
  constructor({ issueCommentModel }) {
    this.issueCommentModel = issueCommentModel;
  }

  getAll = async (req, res) => {
    try {
      const result = await this.issueCommentModel.getAll();
      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getAll Issue Comments:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getById = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.issueCommentModel.getById({ id });

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Issue Comments Not Found",
        });
      }

      res.json(result.recordset[0]);
    } catch (error) {
      console.error("Error in getById:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getByIssueId = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.issueCommentModel.getByIssueId({ id });

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Issue Comments Not Found",
        });
      }

      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getByIssueId:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getByUserId = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.issueCommentModel.getByUserId({ id });

      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Issue Comments Not Found",
        });
      }

      res.json(result.recordset);
    } catch (error) {
      console.error("Error in getByUserId:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  create = async (req, res) => {
    const input = req.body
    try {
      const result = await this.issueCommentModel.create({ input });

      res.json({
        message: "Issue Comment Created Successfully",
        comment: req.body,
      });
    } catch (error) {
      console.error("Error in create Issue Comment:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.issueCommentModel.delete({ id });

      if (result === false) {
        return res.status(404).json({ message: "Issue Comment not found" });
      }

      res.json({ message: "Issue Comment Deleted Successfully" });
    } catch (error) {
      console.error("Error in delete Issue Comment:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
