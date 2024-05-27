import express from "express";
import { signUp, signIn, signOut } from "../controllers/authController";
import { authenticate } from "../middlewares/authentication";
import validate from "../middlewares/validate.middleware";
import { editUserSchema, userSignUpSchema } from "../validators/userValidator";
import { getAllUsers, getUser, updateUser } from "../controllers/userController";

const router = express.Router();

router.get("/", authenticate, getAllUsers );
router.patch("/:id", validate(editUserSchema), authenticate,  updateUser );
router.get("/:id",  authenticate, getUser );

export default router;
