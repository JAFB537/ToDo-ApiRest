import { Router } from "express";

import { IssueCommentController } from "../controllers/issueComment.controllers.js";

export const createIssueCommentRouter = ({ issueCommentModel }) => {
  const router = Router();

  const issueCommentController = new IssueCommentController({ issueCommentModel });

  router.get("/", issueCommentController.getAll);

  router.get("/:id", issueCommentController.getById);

  router.get("/user/:id", issueCommentController.getByUserId);

  router.get("/issue/:id", issueCommentController.getByIssueId);

  router.post("/", issueCommentController.create);

  router.delete("/:id", issueCommentController.delete);

  return router;
};
