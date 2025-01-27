const sequelize = require("sequelize");
const {v4: uuidv4} = require("uuid");
const { Sequelize } = require(".");

module.exports =(sequelize) => {
    return sequelize.define('Feedback' , {
        id : {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
                  allowNull: false,
            primaryKey: true
        },
        patient_id: {

        },
        provider_id : {

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
