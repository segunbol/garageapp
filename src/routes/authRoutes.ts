import express from "express";
import { signUp, signIn, signOut } from "../controllers/authController";
import { authenticate } from "../middlewares/authentication";
import validate from "../middlewares/validate.middleware";
import { userSignInSchema, userSignUpSchema } from "../validators/userValidator";

const router = express.Router();

/** 
 * @swagger
 *   /auth/signup:
 *     post:
 *       summary: SignUp User
 *       tags: [Users]
 *       responses:
 *         "200":
 *           description: Route to Signup User
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
router.post("/signup", validate(userSignUpSchema), signUp);

/** 
 * @swagger
 *   /auth/signin:
 *     post:
 *       summary: Sign In User 
 *       tags: [Users]
 *       responses:
 *         "200":
 *           description: Routes to Authenticate and SignIn User
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
router.post("/signin", validate(userSignInSchema),  signIn);
router.get("/signout",  authenticate, signOut);

export default router;
