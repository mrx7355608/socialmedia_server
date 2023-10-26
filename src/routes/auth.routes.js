import { Router } from "express";
import authControllers from "../controllers/auth.controllers.js";

const router = Router();

router.post("/signup", authControllers.postSignup);
router.post("/login", authControllers.postLogin);
router.post("/logout", authControllers.postLogout);

export default router;
