import { Router } from "express";
import {
  addService,
  getServices,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";

const router = Router();

router.route("/add").post(addService);
router.route("/get").get(getServices);
router.route("/update/:id").put(updateService); 
router.route("/delete/:id").delete(deleteService); 

export const serviceRouter = router;
