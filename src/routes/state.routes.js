import { Router } from "express";

import { StateController } from "../controllers/state.controllers.js";

export const createStateRouter = ({ stateModel }) => {
  const router = Router();

  const stateController = new StateController({ stateModel });

  router.get("/", stateController.getAll);

  router.get("/:id", stateController.getById);

  router.post("/", stateController.create);

  router.put("/:id", stateController.update);

  router.delete("/:id", stateController.delete);

  return router;
};
