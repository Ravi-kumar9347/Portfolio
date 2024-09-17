import { Router } from "express";
import {
  addStartup,
  getStartup,
  updateStartup,
  deleteStartup,
} from "../controllers/startup.controller.js";

const router = Router();

router.route("/add").post(addStartup);
router.route("/get").get(getStartup);
router.route("/update").put(updateStartup);
router.route("/delete").delete(deleteStartup);

export const startupRouter = router;
