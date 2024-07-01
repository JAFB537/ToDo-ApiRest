import { Router } from "express";

import { TypeIssueController } from "../controllers/typeIssue.controllers.js";

export const createTypeIssueRouter = ({ typeIssueModel }) => {
  const router = Router();

  const typeIssueController = new TypeIssueController({ typeIssueModel });

  router.get("/", typeIssueController.getAll);

  router.get("/:id", typeIssueController.getById);

  router.post("/", typeIssueController.create);

  router.put("/:id", typeIssueController.update);

  router.delete("/:id", typeIssueController.delete);

  return router;
};
