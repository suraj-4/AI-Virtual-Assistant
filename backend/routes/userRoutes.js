import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { getCurrentUser, updateAssistant } from "../controller/userController.js";

const router = express.Router();

router.get("/current", isAuth, getCurrentUser);
router.post("/update", isAuth,upload.single("assistantImage"), updateAssistant);

export default router;
