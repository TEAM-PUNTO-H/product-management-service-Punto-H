"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialect: 'postgres',
});
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('Conectado a PostgreSQL');
    }
    catch (error) {
        console.error('Error conectando a PostgreSQL:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
