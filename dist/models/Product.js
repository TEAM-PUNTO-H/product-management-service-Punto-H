"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
exports.Product = database_1.sequelize.define('Products', {
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    price: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    id_user: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
});
