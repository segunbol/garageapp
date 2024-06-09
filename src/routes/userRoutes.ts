import express from "express";
import { authenticate } from "../middlewares/authentication";
import validate from "../middlewares/validate.middleware";
import { editUserSchema, userSignUpSchema } from "../validators/userValidator";
import { getAllUsers, getUser, updateUser } from "../controllers/userController";

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 */


/** 
 * @swagger
 *   /users:
 *     get:
 *       summary: Get All Users
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     400:
 *       description: Bad Request
 *     401:
 *       description: Unauthorized
 */

/** 
 * @swagger
 *   /users/665321bc88c0458e42071840:
 *     get:
 *       summary: Get All Users
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: userid
 *           required: true
 *           schema:
 *             type: string
 *           description: The user ID
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
