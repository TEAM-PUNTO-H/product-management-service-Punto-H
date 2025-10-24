import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const Product = sequelize.define('Products', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  id_user: { type: DataTypes.INTEGER, allowNull: false },

});
