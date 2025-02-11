import sequelize from "../config/sequelizeConfig.js";
import { Model, DataTypes } from 'sequelize';

export class citiesModel extends Model{}

citiesModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
    },
    zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName:"cities",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true
})
