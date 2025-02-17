const sequelize = require("sequelize");
const {v4: uuidv4} = require("uuid");
const { Sequelize } =require('sequelize');

module.exports =(sequelize) => {
    return sequelize.define('feedback' , {
        id : {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
                  allowNull: false,
            primaryKey: true
        },
        patient_id: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false, // Ensure this field is not null if required
            references: {
              model: 'users', // The name of the table you want to reference
              key: 'id', // The column in the referenced table
            },
        },
        provider_id : {
            type: Sequelize.DataTypes.UUID,
            allowNull: false, // Ensure this field is not null if required
            references: {
              model: 'providers', // The name of the table you want to reference
              key: 'id', // The column in the referenced table
            },
        },
        rating : {
            type: Sequelize.DataTypes.INTEGER,
            allowNull : false
        },
        comment : {
            type: Sequelize.DataTypes.STRING,
            allowNull:true,

        },
        created_At : {
            type: Sequelize.DataTypes.DATE,
            default: Date.now,
            
        }
    })
}
