import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser } from "../controller/userController.js";

const router = express.Router();

router.get("/current", isAuth, getCurrentUser);

export default router;
