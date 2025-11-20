"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const products_1 = __importDefault(require("./routes/products"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const swaggerSpec = (0, swagger_jsdoc_1.default)({
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
app.get('/swagger.json', (req, res) => res.json(swaggerSpec));
app.use("/api/products", products_1.default);
app.get('/api/products/health', (_, res) => res.send({ message: 'OK' }));
exports.default = app;
