const Sequelize = require('sequelize');
const {v4: uuidv4} = require("uuid")


module.exports =(sequelize) => {
    return sequelize.define('appointment', {


        id: {

            type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
            allowNull: false,
      primaryKey: true

        },
        patientId : {
            type: Sequelize.DataTypes.UUID,
            allowNull: false, // Ensure this field is not null if required
            references: {
              model: 'users', // The name of the table you want to reference
              key: 'id', // The column in the referenced table
            },

        },
         providerId : {
            type: Sequelize.DataTypes.UUID,
            allowNull: false, // Ensure this field is not null if required
            references: {
              model: 'providers', // The name of the table you want to reference
              key: 'id', // The column in the referenced table
            },

            },
        appointmentDate: {
            type:  Sequelize.DataTypes.DATE,
            allowNull : false

        },

        status: {
        type: Sequelize.DataTypes.ENUM('pending', 'cancelled', 'confirmed')

        }
        
    })
}