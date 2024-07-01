import { Router } from "express";

import { UserProjectController } from "../controllers/userProject.controllers.js";

export const createUserProjectRouter = ({ userProjectModel }) => {
  const router = Router();

  const userProjectController = new UserProjectController({ userProjectModel });

  router.get("/", userProjectController.getAll);

  router.get("/:id", userProjectController.getById);

  router.get("/user/:id", userProjectController.getByUserId);

  router.get("/project/:id", userProjectController.getByProjectId);

  router.post("/", userProjectController.create);

  router.delete("/:id", userProjectController.delete);

  return router;
};