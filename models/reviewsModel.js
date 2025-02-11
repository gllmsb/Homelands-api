import sequelize from "../config/sequelizeConfig.js";
import { Model, DataTypes } from 'sequelize';

export class reviewsModel extends Model{}

reviewsModel.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false, 
        primaryKey: true
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    num_stars: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estate_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName:"reviews",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true
})
