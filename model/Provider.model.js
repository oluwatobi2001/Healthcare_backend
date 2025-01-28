const { allow } = require('joi');
const Sequelize = require('sequelize');
const {v4: uuidv4} = require("uuid")

module.exports  = (sequelize) => {
    return sequelize.define('provider', {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
                  allowNull: false,
            primaryKey: true
          },
          userId : {
            type: Sequelize.DataTypes.UUID,
            allowNull: false, // Ensure this field is not null if required
            references: {
              model: 'users', // The name of the table you want to reference
              key: 'id', // The column in the referenced table
            },

          }, 
          description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },

          specialization : {
            type:  Sequelize.DataTypes.STRING,
            allowNull: false

          },
          location: {

            type: Sequelize.DataTypes.JSON ,
            allowNull: false,

          },
          feeCost: {
            type: Sequelize.DataTypes.FLOAT,
            allowNull: true,
            default: 0
          },
         

    }
)
}