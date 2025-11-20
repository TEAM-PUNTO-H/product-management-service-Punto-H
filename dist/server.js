"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
const PORT = process.env.PORT || 5000;
(0, database_1.connectDB)();
database_1.sequelize.sync({ alter: true }).then(() => console.log('Tablas sincronizadas'));
app_1.default.listen(PORT, () => {
    console.log("Product Management service corriendo en http://product-management-service:5000");
});
