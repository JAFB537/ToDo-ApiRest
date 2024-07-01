import { Router } from "express";

import { ProjectController } from "../controllers/project.controllers.js";

export const createProjectRouter = ({ projectModel }) => {
  const router = Router();

  const projectController = new ProjectController({ projectModel });

  router.get("/", projectController.getAll);

  router.get("/:id", projectController.getById);

  router.post("/", projectController.create);

  router.put("/:id", projectController.update);

  router.delete("/:id", projectController.delete);

  return router;
};