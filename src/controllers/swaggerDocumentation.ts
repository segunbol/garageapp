import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition:{
      openapi: "3.0.0",
      info: {
        version: '1.0.0',
        title: 'Simple Swagger Setup',
        description: 'A simple swagger document',
        contact:{
          name: 'ExtraMortal',
        },
        servers: ["http://localhost:3000"],
        
      },
      schemes: ['http', 'https']
    },
    apis: ["./routes/*.ts"]
  }
  
export const swaggerDoc = swaggerJSDoc(swaggerOptions)

