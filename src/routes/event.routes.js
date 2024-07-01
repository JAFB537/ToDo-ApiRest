import { Router } from "express";

import { EventController } from "../controllers/event.controllers.js";

export const createEventRouter = ({ eventModel }) => {
  const router = Router();

  const eventController = new EventController({ eventModel });

  router.get("/", eventController.getAll);

  router.get("/:id", eventController.getById);

  router.post("/", eventController.create);

  router.put("/:id", eventController.update);

  router.delete("/:id", eventController.delete);

  return router;
};
