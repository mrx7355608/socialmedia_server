import { Router } from "express";
import authControllers from "../controllers/auth.controllers.js";
// MIDDLEWARES
import isAuth from "../middlewares/isAuth.js";
import noAuth from "../middlewares/noAuth.js";

const router = Router();

router.post("/signup", noAuth, authControllers.postSignup);
router.post("/login", noAuth, authControllers.postLogin);
router.post("/logout", isAuth, authControllers.postLogout);
router.patch("/verify-email", authControllers.patchVerifyEmail);
router.patch("/reset-password", authControllers.patchResetPassword);
router.post("/forgot-password", authControllers.postForgotPassword);
router.post(
  "/request-verification-email",
  isAuth,
  authControllers.postRequestVerificatioEmail
);
router.post("/login-as-guest", authControllers.postLoginAsGuest);

export default router;
