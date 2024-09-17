import { Router } from "express";
import {
  addTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonial.controller.js";

const router = Router();

router.route("/add").post(addTestimonial);
router.route("/get").get(getAllTestimonials);
router.route("/update/:id").put(updateTestimonial);
router.route("/delete/:id").delete(deleteTestimonial);

export const testimonialRouter = router;
