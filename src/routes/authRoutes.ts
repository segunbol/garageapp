import express from "express";
import { signUp, signIn, signOut } from "../controllers/authController";
import { authenticate } from "../middlewares/authentication";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", authenticate, signOut);

export default router;
