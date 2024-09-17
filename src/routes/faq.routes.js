import { Router } from "express";
import {
  addFaq,
  getAllFaqs,
  deleteFaq,
} from "../controllers/faq.controller.js";

const router = Router();

router.route("/add").post(addFaq);
router.route("/get").get(getAllFaqs);
router.route("/delete/:id").delete(deleteFaq);

export const faqRouter = router;
