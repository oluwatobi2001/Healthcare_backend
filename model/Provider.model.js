const Sequelize = require('sequelize');
const {v4: uuidv4} = require("uuid")

module.exports  = (sequelize) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
                  allowNull: false,
            primaryKey: true
          },
          user_id : {

          }, 
          description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },

          specialization : {

          },
          location: {

            type: Sequelize.DataTypes.ARRAY,
            allowNull: false,

          },
          fee_cost: {
            type: Sequelize.DataTypes.FLOAT,
            allowNull: true,
            default: 0
          },
          avgRating : {

          }

    }
)
}