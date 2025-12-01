import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import productRouter from "./routes/products";
import reviewRouter from "./routes/review";

const app = express();
app.use(express.json());


const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gestion De Productos Microservice",
      version: "1.0.0",
      description: "Microservicio que gestiona los productos",
    },
  },
  apis: ["./src/routes/*.ts"],
});


app.get('/swagger.json', (req,res)=> res.json(swaggerSpec))
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.get('/api/products/health',(_,res)=> res.send({message: 'OK'}));

export default app;