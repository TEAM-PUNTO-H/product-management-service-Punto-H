import { DataTypes } from 'sequelize';
import { sequelize } from '../database';


export const Review = sequelize.define('Reviews', {
    id_user: { type: DataTypes.INTEGER, allowNull: false },
    id_product: { type: DataTypes.INTEGER, allowNull: false },
    score : { type: DataTypes.INTEGER, allowNull: false },
    review: { type: DataTypes.STRING, allowNull: false },
});
