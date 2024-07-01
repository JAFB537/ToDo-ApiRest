import { Router } from "express";

import { IssueController } from "../controllers/issue.controllers.js";

export const createIssueRouter = ({ issueModel }) => {
  const router = Router();

  const issueController = new IssueController({ issueModel });

  router.get("/", issueController.getAll);

  router.get("/:id", issueController.getById);

  router.post("/", issueController.create);

  router.put("/:id", issueController.update);

  router.delete("/:id", issueController.delete);

  return router;
};
