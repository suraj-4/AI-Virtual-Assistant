import express from "express"
import { logIn, logOut, signUp } from "../controller/authController.js"

const authRoute = express.Router()

authRoute.post("/signup", signUp);
authRoute.post("/login", logIn);
authRoute.get("/logout", logOut);

export default authRoute;