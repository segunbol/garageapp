import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookstore CRUD REST API",
      version: "1.0.0",
      description:
        "This is a CRUD RESTAPI Documentation for The Garage App",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: [
            "userName",
            "firstName",
            "lastName",
            "gender",
            "password",
            "email",
            "phoneNo",
          ],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            userName: {
              type: "string",
              description: "An alias or nickname of the user. Has to be unique",
            },
            firstName: { type: "string", description: "The User Firtsname" },
            lastName: {
              type: "string",
              description: "The User Lastname(Family name)",
            },
            gender: { type: "string", description: "The User Gender" },
            vehicles: {
              type: "string",
              description: "The name and list of cars user has",
            },
            password: { type: "string", description: "The User password" },
            isAdmin: {
              type: "boolean",
              description:
                "This booleans indicates if the user is an admin or not ",
            },
            verified: {
              type: "boolean",
              description:
                "this boolean indicates if the user hasd been verified or not",
            },
            email: { type: "string", description: "The User email" },
            phoneNo: {
              type: "string",
              description: "The User Mobile Number",
            },
            address: {
              type: "string",
              description: "The User house residential address",
            },
            state: {
              type: "string",
              description: "The User State of residence",
            },
            city: { type: "string", description: "The User City" },
          },
          example: {
            userName: "mortal",
            firstName: "segun",
            lastName: "bolawole",
            gender: "male",
            vehicles: [],
            password: "123456",
            isAdmin: false,
            verified: false,
            email: "segun@garage.com",
            phoneNo: "08067667437",
            address: "glover road",
            state: "lagos",
            city: "ikoyi",
          },
        },
      },
      responses: {
        400: {
          description:
            "Missing API key - include it in the Authorization header",
          contents: "application/json",
        },
        401: {
          description: "Unauthorized - incorrect API key or incorrect format",
          contents: "application/json",
        },
        404: {
          description: "Not found - the book was not found",
          contents: "application/json",
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "apiKey", 
          name: "Authorization",
          in: "header",
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const Doc = swaggerJSDoc(options);
