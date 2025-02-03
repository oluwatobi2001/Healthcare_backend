const sequelize = require("sequelize");
const {v4: uuidv4} = require("uuid");
const { Sequelize } =require('sequelize');

module.exports =(sequelize) => {
    return sequelize.define('reminder' , {
        id : {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
                  allowNull: false,
            primaryKey: true
        },
       
        appointmentId : {
            type: Sequelize.DataTypes.UUID,
            allowNull: false, // Ensure this field is not null if required
            references: {
              model: 'appointments', // The name of the table you want to reference
              key: 'id', // The column in the referenced table
            },
        },
       message: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false, // Ensure this field is not null if required
            
        }, 
        reminder_time : {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },
        
        reminder_status : {
            type: Sequelize.DataTypes.ENUM("pending", "sent"),
            defaultValue: "pending"
        },
       
    })
}
