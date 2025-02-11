import sequelize from "../config/sequelizeConfig.js";
import { Model, DataTypes } from 'sequelize';

export class energy_labelsModel extends Model{}

energy_labelsModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName:"energy_labels",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true
})
