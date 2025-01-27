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
        patient_id : {

        },
         provider_id : {

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