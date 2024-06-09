import express from "express";
import { authenticate } from "../middlewares/authentication";
import validate from "../middlewares/validate.middleware";
import { editUserSchema, userSignUpSchema } from "../validators/userValidator";
import { getAllUsers, getUser, updateUser } from "../controllers/userController";

const router = express.Router();

/** 
 * @swagger
 *   /users:
 *     get:
 *       summary: Get All Users
 *       tags: [Users]
 *       responses:
 *         "200":
 *           description: Returns All Users
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
router.get("/", authenticate, getAllUsers );

/** 
 * @swagger
 *   /users/:id:
 *     get:
 *       summary: Get All Users
 *       tags: [Users]
 *       responses:
 *         "200":
 *           description: Returns All Users
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
router.patch("/:id", authenticate, validate(editUserSchema),  updateUser );
router.get("/:id",  authenticate, getUser );

export default router;
