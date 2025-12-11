import { DataTypes } from "sequelize";
import { sequelize } from "../database";


export const Restaurant = sequelize.define('Restaurants', {
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  id_user: { type: DataTypes.INTEGER, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  sendCost: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  typeFood: { type: DataTypes.STRING, allowNull: false },
  minTime: { type: DataTypes.INTEGER, allowNull: false },
  maxTime: { type: DataTypes.INTEGER, allowNull: false },

});