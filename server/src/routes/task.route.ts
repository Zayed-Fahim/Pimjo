import express, { Router } from "express";
import {
  taskCreationController,
  taskGettingController,
} from "../controllers/task.controller";
import authorization from "../middlewares/authorization";

const router: Router = express.Router();

router
  .route("/")
  .post(authorization, taskCreationController)
  .get(authorization, taskGettingController);

router.route("/:id").get().put().delete();

export default router;
