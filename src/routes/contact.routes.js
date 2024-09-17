import { Router } from "express";
import {
  addContact,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";

const router = Router();

router.route("/add").post(addContact);
router.route("/get").get(getContact);
router.route("/update").put(updateContact);
router.route("/delete").delete(deleteContact);

export const contactRouter = router;
