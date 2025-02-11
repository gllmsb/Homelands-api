import sequelize from "../config/sequelizeConfig.js";
import { Model, DataTypes } from 'sequelize';

export class favoritesModel extends Model{}

favoritesModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    estate_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    sequelize,
    modelName:"favorites",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true
})
