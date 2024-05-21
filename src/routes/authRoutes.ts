import express from "express";
import { signUp, signIn, signOut } from "../controllers/authController";
import { authenticate } from "../middlewares/authentication";
import validate from "../middlewares/validate.middleware";
import { userSignInSchema, userSignUpSchema } from "../validators/userValidator";

const router = express.Router();

router.post("/signup", validate(userSignUpSchema), signUp);
router.post("/signin", validate(userSignInSchema),  signIn);
router.get("/signout",  authenticate, signOut);

export default router;
