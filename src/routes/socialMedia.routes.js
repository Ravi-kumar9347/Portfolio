import { Router } from "express";
import {
  addSocialMedia,
  getAllSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} from "../controllers/socialMedia.controller.js";

const router = Router();

router.route("/add").post(addSocialMedia);
router.route("/get").get(getAllSocialMedia);
router.route("/update/:id").put(updateSocialMedia);
router.route("/delete/:id").delete(deleteSocialMedia);

export const socialMediaRouter = router;
