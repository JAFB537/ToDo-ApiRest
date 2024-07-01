import { Router } from "express";

import { ProjectCommentController } from "../controllers/projectComment.controllers.js";

export const createProjectCommentRouter = ({ projectCommentModel }) => {
  const router = Router();

  const projectCommentController = new ProjectCommentController({ projectCommentModel });

  router.get("/", projectCommentController.getAll);

  router.get("/:id", projectCommentController.getById);

  router.get("/project/:id", projectCommentController.getByProjectId);

  router.get("/user/:id", projectCommentController.getByUserId);

  router.post("/", projectCommentController.create);

  router.delete("/:id", projectCommentController.delete);

  return router;
};